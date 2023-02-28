/*
 * 图片
 * 1. 支持各种样式设置
 * 2. 支持本地和远端图片
 * 3. 图片缓存到本地
 * 4. 远端图片自动获取高度
 * 5. 错误处理
 * 6. 自动选择Bangumi图片质量
 * 7. 联动ImageViewer
 * 8. 支持 @magma 提供的 [bgm_poster] 后缀
 * 9. iOS 环境下, Expo 浏览暂时不使用 cacheV2
 *
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 19:05:56
 */
import React from 'react'
import { View, Image as RNImage, ImageProps as RNImageProps } from 'react-native'
import { observer } from 'mobx-react'
import { CacheManager } from '@components/@/react-native-expo-image-cache'
import { _, systemStore } from '@stores'
import { getCoverMedium, getTimestamp } from '@utils'
import { IOS } from '@constants'
import { Source } from '@types'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { devLog } from '../dev'
import CompImage from './image'
import {
  checkBgmEmoji,
  checkError404,
  checkError451,
  fixedRemoteImageUrl,
  getDevStyles,
  imageViewerCallback,
  setError404,
  setError451
} from './utils'
import {
  DEFAULT_HEADERS,
  DEFAULT_PROPS,
  MAX_ERROR_COUNT,
  OSS_BGM,
  OSS_MEGMA_PREFIX,
  RETRY_DISTANCE
} from './ds'
import { memoStyles } from './styles'
import { Props as ImageProps, State } from './types'

export { ImageProps }

export const Image = observer(
  class ImageComponent extends React.Component<ImageProps, State> {
    static defaultProps: ImageProps = DEFAULT_PROPS

    state: State = {
      error: false,
      uri: undefined,
      width: 0,
      height: 0
    }

    _errorCount = 0

    _timeoutId = null

    componentDidMount() {
      const { src, cache, textOnly, sync } = this.props
      if (textOnly) return

      if (!cache) {
        this.setState({
          uri: src
        })
        return
      }

      /** 若同一时间存在大量低速度图片, 会把整个运行时卡住, 暂时使用 setTimeout 处理 */
      if (sync) {
        this.preCache()
      } else {
        setTimeout(() => {
          this.preCache()
        }, 0)
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps: { src: Source }) {
      const { textOnly } = this.props
      if (textOnly) return
      if (nextProps.src !== this.props.src) this.cache(nextProps.src)
    }

    componentWillUnmount() {
      if (this._timeoutId) clearTimeout(this._timeoutId)
    }

    preCache = async () => {
      const { src, autoSize } = this.props
      if (IOS) {
        await this.cache(src)
      } else {
        await this.cacheV2(src)
      }

      if (autoSize) {
        setTimeout(() => {
          this.getSize()
        }, 0)
      }
    }

    /** 缓存图片 */
    cache = async (src: Source) => {
      const { iosImageCacheV2 } = systemStore.setting
      if (IOS && iosImageCacheV2) return this.cacheV2(src)

      let res: Promise<string>
      let uri: string

      if (IOS) {
        try {
          if (typeof src === 'string') {
            const _src = fixedRemoteImageUrl(src)

            // 空地址不作处理
            if (_src === 'https:') {
              this.commitError('error: 1')
              return false
            }

            /**
             * 检查本地有没有图片缓存
             * @issue 这个地方没判断同时一个页面有相同图片, 同时检测本地地址的会触发unmounted
             * @issue to fixed
             */
            if (typeof _src === 'string' && _src.includes('https:/img/')) {
              this.commitError('error: 2')
              return false
            }

            res = CacheManager.get(_src, {
              headers: this.headers
            }).getPath()
            const path = await res

            /**
             * magma 的 cdn 要单独对第一次对象存储镜像做延迟处理
             * 需要再重新请求一遍
             * @date 20220509
             */
            if (
              typeof _src === 'string' &&
              _src.includes(OSS_MEGMA_PREFIX) &&
              path === undefined
            ) {
              this.onError()
            } else {
              const uri = path || _src
              if (this.state.uri !== uri) {
                this.setState({
                  uri: path || _src
                })
              }
            }
          }
        } catch (error) {
          this.retry(src as string)
        }
      } else {
        /** 安卓貌似自带缓存? */
        if (typeof src === 'string') {
          if (checkBgmEmoji(src) || checkError451(src) || checkError404(src)) {
            this.recoveryToBgmCover()
            return
          }
        }

        uri = fixedRemoteImageUrl(uri)

        // 空地址不作处理
        if (uri === 'https:') return false

        if (uri) {
          this.setState({
            uri
          })
        }
      }

      return res
    }

    /** 缓存图片 (使用系统默认图片策略) */
    cacheV2 = async (src: Source) => {
      let uri: string
      if (!IOS && typeof src === 'string') {
        if (checkBgmEmoji(src) || checkError451(src) || checkError404(src)) {
          this.recoveryToBgmCover()
          return
        }
      }

      uri = (src || '') as string
      if (typeof uri === 'string') {
        if (uri.indexOf('https:') === -1 && uri.indexOf('http:') === -1) {
          uri = `https:${uri}`
        }
      }

      // 空地址不作处理
      if (uri === 'https:') return false

      if (uri) {
        this.setState({
          uri
        })
      }

      return true
    }

    /** 图片是不是会下载失败, 当错误次数大于 MAX_ERROR_COUNT 就认为是错误 */
    retry = (src: string) => {
      if (this._errorCount < MAX_ERROR_COUNT) {
        this._timeoutId = setTimeout(() => {
          this._errorCount += 1
          this.cache(src)
        }, 400)
      } else {
        this._timeoutId = null
        setTimeout(() => {
          this.onError()
        }, 0)
      }
    }

    _getSized = false

    /** 获取远程图片宽高 */
    getSize = () => {
      if (this._getSized) return

      const { autoSize } = this.props
      const { uri } = this.state

      if (typeof uri !== 'string' || typeof autoSize !== 'number') return

      const cb = (width: number, height: number) => {
        let w: number
        let h: number

        // 假如图片本身的宽度没有超过给定的最大宽度, 直接沿用图片原尺寸
        if (width < autoSize) {
          w = width
          h = height
        } else {
          w = autoSize
          h = Math.floor((autoSize / width) * height)
        }

        this._getSized = true
        this.setState({
          width: w,
          height: h
        })
      }

      setTimeout(() => {
        RNImage.getSize(uri, cb)
      }, 0)
    }

    _fallbacked = false

    /** 加载失败 */
    onError = async (error?: any) => {
      const { src } = this.props
      if (
        typeof src === 'string' &&
        src.includes(OSS_MEGMA_PREFIX) &&
        this._errorCount < MAX_ERROR_COUNT
      ) {
        if (checkBgmEmoji(src) || checkError451(src) || checkError404(src)) {
          this.recoveryToBgmCover()
          return
        }

        setTimeout(() => {
          if (IOS) {
            const that = this
            const request = new XMLHttpRequest()
            request.withCredentials = false
            request.onreadystatechange = function () {
              if (this.readyState === 4) {
                if (this.status === 451) {
                  setError451(src)
                  that.recoveryToBgmCover()
                } else {
                  setTimeout(() => {
                    that.retry(`${src}?ts=${getTimestamp()}`)
                  }, RETRY_DISTANCE)
                }
              }
            }
            request.open('get', src, true)
            request.send(null)
          } else {
            RNImage.getSize(
              src,
              () => {},
              error => {
                // magma oss 若 status code 为 451 直接触发失败
                if (String(error).includes('code=451')) {
                  setError451(src)
                  this.recoveryToBgmCover()
                } else {
                  setTimeout(() => {
                    this.retry(`${src}?ts=${getTimestamp()}`)
                  }, RETRY_DISTANCE)
                }
              }
            )
          }
        }, 0)
        return
      } else if (typeof src === 'string' && src.includes(OSS_MEGMA_PREFIX)) {
        // 失败次数达到最大值, 回退到 bgm 源头
        setError404(src)
        this.recoveryToBgmCover()
        return
      }

      const { fallbackSrc } = this.props
      const { uri } = this.state
      if (fallbackSrc && uri !== fallbackSrc && !this._fallbacked) {
        this._fallbacked = true
        this.setState({
          uri: fallbackSrc
        })
      } else {
        this.commitError(error)
      }
    }

    _recoveried = false

    /** 其他源头回退到 bgm 源头 */
    recoveryToBgmCover = () => {
      const { src } = this.props
      if (typeof src !== 'string' || this._recoveried) return

      // 提取原来的封面图片地址
      let s = src.split('/pic/')?.[1] || ''
      if (s) s = s.replace(OSS_MEGMA_PREFIX, '')

      this._recoveried = true
      this.setState({
        uri: getCoverMedium(`${OSS_BGM}/pic/${s}`)
      })
    }

    _commited = false

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    commitError = (info?: string) => {
      if (this._commited) return

      this._commited = true
      this.setState(
        {
          error: true
        },
        () => {
          const { onError } = this.props
          if (typeof onError === 'function') onError()
        }
      )

      // if (info) devLog(info)
    }

    get headers(): {} {
      const { src, headers } = this.props
      if (headers) {
        if (typeof src === 'string' && src.includes('lain.')) {
          return {
            ...DEFAULT_HEADERS,
            ...(headers || {})
          }
        }

        return {
          ...headers
        }
      }

      if (typeof src === 'string' && src.includes('lain.')) return DEFAULT_HEADERS

      return {}
    }

    get computedStyle() {
      const {
        style,
        imageStyle,
        size,
        height,
        border,
        borderWidth,
        radius,
        shadow,
        placeholder,
        autoSize
      } = this.props
      const { width: w, height: h } = this.state
      const container = []
      const image = []

      // 以 state 里面的 width 和 height 优先
      if (autoSize) {
        image.push({
          width: w || 160,
          height: h || 160
        })
      } else if (size) {
        image.push({
          width: this.props.width || size,
          height: height || size
        })
      }

      // 若边框等于hairlineWidth且有影子就不显示边框
      if (border && !(border === _.hairlineWidth && shadow)) {
        image.push(
          typeof border === 'string'
            ? {
                borderWidth,
                borderColor: border
              }
            : this.styles.border
        )
      }

      // 圆角
      if (radius) {
        if (typeof radius === 'boolean') {
          const style = {
            borderRadius: this.borderRadius,
            overflow: 'hidden'
          }
          container.push(style)
          image.push(style)
        } else {
          const style = {
            borderRadius: radius,
            overflow: 'hidden'
          }
          container.push(style)
          image.push(style)
        }
      }

      /**
       * 以下特殊情况不显示阴影
       *
       * _.isDark 黑暗模式没必要显示阴影
       * systemStore.devEvent 安卓下当有阴影, 层级会被提高, 导致遮挡卖点分析的可视化文字
       */
      if (shadow && !_.isDark && !(!IOS && systemStore.devEvent.text)) {
        container.push(shadow === 'lg' ? this.styles.shadowLg : this.styles.shadow)
      }
      if (placeholder) container.push(this.styles.placeholder)
      if (style) container.push(style)
      if (imageStyle) {
        container.push(imageStyle)
        image.push(imageStyle)
      }

      if (this.dev) image.push(getDevStyles(this.props.src, this._fallbacked))

      return {
        container,
        image
      }
    }

    get fadeDuration() {
      const { fadeDuration } = this.props
      const { imageTransition } = systemStore.setting
      return fadeDuration === undefined
        ? imageTransition
          ? undefined
          : 0
        : fadeDuration
    }

    get borderRadius() {
      const { coverRadius } = systemStore.setting
      return coverRadius || _.radiusXs
    }

    get dev() {
      return systemStore.state.dev
    }

    renderTextOnly() {
      return (
        <Flex style={this.computedStyle.image} justify='center'>
          <Text style={this.styles.textOnly} type='sub' bold>
            text-only
          </Text>
        </Flex>
      )
    }

    renderError() {
      const size = this.props.width || this.props.size || 80
      return (
        <Flex style={[this.computedStyle.image, this.styles.error]} justify='center'>
          <Iconfont
            style={this.styles.errorIcon}
            name='md-do-not-disturb-alt'
            size={Math.min(size / 2.4, 80)}
          />
        </Flex>
      )
    }

    renderPlaceholder() {
      return <View style={this.computedStyle.image} />
    }

    // renderTransitionImage(uri, other) {
    //   return (
    //     <AnimatedImage
    //       style={[
    //         this.computedStyle.image,
    //         {
    //           width: this.props.width || this.props.size
    //         }
    //       ]}
    //       uri={uri}
    //       headers={this.headers}
    //       tint={_.select('light', 'dark')}
    //       preview={_.select(IMG_EMPTY, IMG_EMPTY_DARK)}
    //       onError={this.onError}
    //       {...other}
    //     />
    //   )
    // }

    renderRemoteImage(uri, other) {
      const source: RNImageProps['source'] = {
        headers: this.headers,
        uri: uri.replace('http://', 'https://') // 安卓新版本不允许非 https 的图片了
      }
      if (IOS) source.cache = 'force-cache'

      return (
        <CompImage
          style={this.computedStyle.image}
          source={source}
          fadeDuration={this.fadeDuration}
          onError={this.onError}
          {...other}
        />
      )
    }

    renderLocalImage(headers, src, other) {
      let source: RNImageProps['source']
      if (headers && typeof src === 'object') {
        source = {
          ...src,
          headers: this.headers
        }
      } else {
        source = src as RNImageProps['source']
      }

      return (
        <CompImage
          style={this.computedStyle.image}
          source={source}
          fadeDuration={this.fadeDuration}
          onError={this.onError}
          {...other}
        />
      )
    }

    renderImage() {
      const {
        style,
        imageStyle,
        src,
        size,
        height,
        border,
        borderWidth,
        radius,
        shadow,
        placeholder,
        autoSize,
        quality,
        imageViewer,
        imageViewerSrc,
        headers,
        event,
        delay,
        scale,
        cache,
        fadeDuration,
        errorToHide,
        textOnly,
        onPress,
        onLongPress,
        onError,
        ...other
      } = this.props
      if (textOnly) return this.renderTextOnly()

      const { error, uri } = this.state
      if (error && errorToHide) return null

      if (error) return this.renderError()

      if (typeof src === 'string' || typeof src === 'undefined') {
        // 没有图片占位
        if (!uri) return this.renderPlaceholder()

        if (typeof uri === 'string') {
          // IOS 使用了 CacheManager 管理图片, 请求时已加 headers, 所以组件就不需要再加了
          // if (IOS && systemStore.setting.imageTransition) {
          //   return this.renderTransitionImage(uri, other)
          // }

          // 获取图片的宽高中, 占位
          if (!IOS && autoSize && !this.state.width) return this.renderPlaceholder()

          // 网络图片
          return this.renderRemoteImage(uri, other)
        }
      }

      // 本地图片
      return this.renderLocalImage(headers, src, other)
    }

    renderTouchabelImage(onPress) {
      const { delay, scale, onLongPress } = this.props
      return (
        <View style={this.computedStyle.container}>
          <Touchable
            delay={delay}
            scale={scale}
            onPress={onPress}
            onLongPress={
              this.dev
                ? () => {
                    devLog(
                      JSON.stringify(
                        {
                          ...this.props,
                          ...this.state
                        },
                        null,
                        2
                      )
                    )
                  }
                : onLongPress
            }
          >
            {this.renderImage()}
          </Touchable>
        </View>
      )
    }

    render() {
      const { src, imageViewer, imageViewerSrc, event, onPress, onLongPress } =
        this.props
      const { uri } = this.state
      let _onPress = onPress

      // 需要调用 ImageViewer 弹窗
      if (imageViewer) {
        _onPress = imageViewerCallback({
          imageViewerSrc,
          uri,
          src,
          headers: this.headers,
          event
        })
      }

      // 带点击事件
      if (this.dev || _onPress || onLongPress) {
        return this.renderTouchabelImage(_onPress)
      }

      return <View style={this.computedStyle.container}>{this.renderImage()}</View>
    }

    get styles() {
      return memoStyles()
    }
  }
)
