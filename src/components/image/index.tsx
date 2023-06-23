/*
 * 图片
 * 1. 支持各种样式设置
 * 2. 支持本地和远端图片
 * 3. 图片缓存到本地
 * 4. 远端图片自动获取高度
 * 5. 错误处理
 * 6. 自动选择 Bangumi 图片质量
 * 7. 联动 ImageViewer
 * 8. 支持 @magma 提供的 [bgm_poster] 后缀
 * 9. iOS 环境下, Expo 浏览暂时不使用 cacheV2
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 20:31:00
 */
import React from 'react'
import { View, Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { CacheManager } from '@components/@/react-native-expo-image-cache'
import { _, systemStore } from '@stores'
import { getCover400, getTimestamp } from '@utils'
import { DEV, HOST_CDN_AVATAR, IOS, STORYBOOK } from '@constants'
import { AnyObject, Fn, Source } from '@types'
import { IOS_IPA } from '@/config'
import { Touchable } from '../touchable'
import { devLog } from '../dev'
import Error from './error'
import Local from './local'
import Placeholder from './placeholder'
import Remote from './remote'
import Skeleton from './skeleton'
import TextOnly from './text-only'
import {
  checkBgmEmoji,
  checkError404,
  checkError451,
  checkErrorTimeout,
  fixedRemoteImageUrl,
  getDevStyles,
  imageViewerCallback,
  setError404,
  setError451,
  setErrorTimeout,
  timeoutPromise
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
      uri: STORYBOOK ? fixedRemoteImageUrl(this.props.src) : undefined,
      width: 0,
      height: 0,
      loaded: false
    }

    /** 图片下载失败次数 */
    private _errorCount = 0

    /** 图片下载失败重试间隔 */
    private _timeoutId = null

    /** 是否已获取远程图片宽高 */
    private _getSized = false

    /** 是否已回退到 props.fallback 地址 */
    private _fallbacked = false

    /** 是否已回退到 bgm 源头  */
    private _recoveried = false

    /** 是否已确定加载失败 */
    private _commited = false

    /** 当前图片大小 */
    private _size = 0

    componentDidMount() {
      const { src, cache, textOnly, sync } = this.props
      if (textOnly) return

      if (!cache || STORYBOOK) {
        this.setState({
          uri: fixedRemoteImageUrl(src)
        })
        return
      }

      /** 若同一时间存在大量低速度图片, 会把整个运行时卡住, 暂时使用 setTimeout 处理 */
      if (sync) return this.preCache()

      setTimeout(() => {
        this.preCache()
      }, 0)
    }

    UNSAFE_componentWillReceiveProps(nextProps: { src: Source | string }) {
      const { textOnly } = this.props
      if (textOnly) return

      if (nextProps.src !== this.props.src) {
        if (STORYBOOK) {
          this.setState({
            uri: fixedRemoteImageUrl(nextProps.src)
          })
          return
        }

        this.cache(nextProps.src)
      }
    }

    componentWillUnmount() {
      if (this._timeoutId) clearTimeout(this._timeoutId)
    }

    /** 预加载的规则 */
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
    cache = async (src: Source | string) => {
      const { iosImageCacheV2 } = systemStore.setting
      if (IOS && iosImageCacheV2) return this.cacheV2(src)

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
             * @issue 这个地方没判断同时一个页面有相同图片, 同时检测本地地址的会触发 unmounted
             */
            if (typeof _src === 'string' && _src.includes('https:/img/')) {
              this.commitError('error: 2')
              return false
            }

            /** 头像 CDN 目前尚未稳定, 发现了图片损坏下载不能的现象 (暂时写了超时应对) */
            let path: string
            if (typeof _src === 'string' && _src.includes(HOST_CDN_AVATAR)) {
              try {
                await Promise.race([
                  new Promise(async resolve => {
                    const result = await CacheManager.get(_src, {
                      headers: this.headers
                    }).getPath()
                    path = result?.path
                    this._size = result?.size
                    resolve(true)
                  }),
                  timeoutPromise()
                ])
              } catch (error) {
                if (typeof this.props.src === 'string') setErrorTimeout(this.props.src)
                this.onError(error)
                return
              }
            } else {
              const result = await CacheManager.get(_src, {
                headers: this.headers
              }).getPath()
              path = result?.path
              this._size = result?.size
            }

            /**
             * magma 的 cdn 要单独对第一次对象存储镜像做延迟处理, 需要再重新请求一遍
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
          this.retry(src)
        }
        return
      } else {
        /** 安卓貌似自带缓存 */
        if (typeof src === 'string') {
          if (checkBgmEmoji(src) || checkError451(src) || checkError404(src)) {
            this.recoveryToBgmCover()
            return
          }

          if (checkErrorTimeout(src)) {
            this.onError()
            return
          }
        }

        uri = fixedRemoteImageUrl(uri)

        // 空地址不作处理
        if (uri === 'https:') return false

        if (uri) {
          this.setState({
            uri: uri as Source
          })
        }
      }
    }

    /** 缓存图片 (使用系统默认图片策略) */
    cacheV2 = async (src: Source | string) => {
      let uri: string
      if (!IOS && typeof src === 'string') {
        if (checkBgmEmoji(src) || checkError451(src) || checkError404(src)) {
          this.recoveryToBgmCover()
          return
        }

        if (checkErrorTimeout(src)) {
          this.onError()
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
          uri: uri as Source
        })
      }

      return true
    }

    /** 图片是不是会下载失败, 当错误次数大于 MAX_ERROR_COUNT 就认为是错误 */
    retry = (src: Source | string) => {
      if (this._errorCount < MAX_ERROR_COUNT) {
        this._timeoutId = setTimeout(() => {
          this._errorCount += 1
          this.cache(src)
        }, 400)
        return
      }

      this._timeoutId = null
      setTimeout(() => {
        this.onError()
      }, 0)
    }

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
                } else if (this.status === 404) {
                  setError404(src)
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
                } else if (String(error).includes('code=404')) {
                  setError404(src)
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
          uri: fixedRemoteImageUrl(fallbackSrc)
        })
      } else {
        this.commitError(error)
      }
    }

    /** 其他源头回退到 bgm 源头 */
    recoveryToBgmCover = () => {
      const { src, fallbackSrc } = this.props
      if (typeof src !== 'string' || this._recoveried) return

      this._recoveried = true
      if (fallbackSrc) {
        this.setState({
          uri: fixedRemoteImageUrl(fallbackSrc)
        })
        return
      }

      // 提取原来的封面图片地址
      let s = src.split('/pic/')?.[1] || ''
      if (s) s = s.replace(/\/bgm_poster(_100|_200)?/g, '')

      // 如果是触发回滚机制的图, 通常是游戏类的横屏图, 所以可以使用 height 去检查加大一个级别
      const width = Math.max(
        this.props.width || 0,
        this.props.height || 0,
        this.props.size || 0
      )
      let coverSize: 100 | 200 | 400 = 100
      if (STORYBOOK) {
        if (width > 200) {
          coverSize = 400
        } else if (width > 100) {
          coverSize = 200
        }
      } else {
        if (width > 134) {
          coverSize = 400
        } else if (width > 67) {
          coverSize = 200
        }
      }
      this.setState({
        uri: getCover400(`${OSS_BGM}/pic/${s}`, coverSize)
      })
    }

    /** 确定失败 */
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
          if (DEV) console.info('commitError', info)
        }
      )
    }

    /** 加载步骤完成 */
    onLoadEnd = () => {
      this.setState(
        {
          loaded: true
        },
        () => {
          const { onLoadEnd } = this.props
          if (typeof onLoadEnd === 'function') onLoadEnd()
        }
      )
    }

    /** 自定义请求头 */
    get headers(): AnyObject {
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

    /** 计算图片实际样式 */
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
          height: h || (STORYBOOK ? 'auto' : 160)
        })
      } else if (size) {
        image.push({
          width: this.props.width || size,
          height: height || size
        })
      }

      // 若边框等于 hairlineWidth 且有影子就不显示边框
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

      if (this.dev) {
        image.push(getDevStyles(this.props.src, this._fallbacked, this._size))
      }

      return {
        container,
        image
      }
    }

    /** 圆角 */
    get borderRadius() {
      const { coverRadius } = systemStore.setting
      return coverRadius || _.radiusXs
    }

    /** 开发模式 */
    get dev() {
      return systemStore.state.dev
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
        withoutFeedback,
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
      if (textOnly) return <TextOnly style={this.computedStyle.image} />

      const { error, uri } = this.state
      if (error && errorToHide) return null

      if (error && !STORYBOOK) {
        return (
          <Error
            style={this.computedStyle.image}
            size={this.props.width || this.props.size}
          />
        )
      }

      if (typeof src === 'string' || typeof src === 'undefined') {
        // 没有图片占位
        if (!uri) return <Placeholder style={this.computedStyle.image} />

        if (typeof uri === 'string') {
          // 获取图片的宽高中, 占位
          if (!(IOS || STORYBOOK) && autoSize && !this.state.width) {
            return <Placeholder style={this.computedStyle.image} />
          }

          // 网络图片
          return (
            <Remote
              {...other}
              style={this.computedStyle.image}
              headers={this.headers}
              uri={uri}
              autoSize={autoSize}
              onError={this.onError}
              onLoadEnd={this.onLoadEnd}
            />
          )
        }
      }

      // 本地图片
      return (
        <Local
          {...other}
          style={this.computedStyle.image}
          headers={headers}
          overrideHeaders={this.headers}
          src={src}
          onError={this.onError}
          onLoadEnd={this.onLoadEnd}
        />
      )
    }

    renderTouchableImage(onPress: Fn) {
      const {
        textOnly,
        placeholder,
        delay,
        scale,
        skeleton,
        withoutFeedback,
        onLongPress
      } = this.props
      const { loaded } = this.state
      return (
        <View style={this.computedStyle.container}>
          <Touchable
            delay={delay}
            scale={scale}
            withoutFeedback={withoutFeedback}
            onPress={onPress}
            onLongPress={
              this.dev
                ? () => {
                    devLog(
                      JSON.stringify(
                        {
                          _size: `${Math.floor(this._size / 1024)} kb`,
                          _errorCount: this._errorCount,
                          _timeoutId: this._timeoutId,
                          _getSized: this._getSized,
                          _fallbacked: this._fallbacked,
                          _recoveried: this._recoveried,
                          _commited: this._commited,
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
          {!IOS_IPA && skeleton && (
            <Skeleton
              style={this.computedStyle.image}
              textOnly={textOnly}
              placeholder={placeholder}
              loaded={loaded}
            />
          )}
        </View>
      )
    }

    render() {
      const {
        src,
        textOnly,
        placeholder,
        imageViewer,
        imageViewerSrc,
        skeleton,
        event,
        onPress,
        onLongPress
      } = this.props
      const { uri, loaded } = this.state
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
        return this.renderTouchableImage(_onPress)
      }

      return (
        <View style={this.computedStyle.container}>
          {this.renderImage()}
          {!IOS_IPA && skeleton && (
            <Skeleton
              style={this.computedStyle.image}
              textOnly={textOnly}
              placeholder={placeholder}
              loaded={loaded}
            />
          )}
        </View>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
