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
 *
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 18:10:15
 */
import React from 'react'
import { View, Image as RNImage } from 'react-native'
import {
  CacheManager,
  Image as AnimatedImage
} from '@components/@/react-native-expo-image-cache'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { getCoverMedium, getTimestamp } from '@utils'
import { showImageViewer } from '@utils/ui'
import { t } from '@utils/fetch'
import { HOST, IOS, IMG_EMPTY, IMG_EMPTY_DARK, EVENT, TEXT_ONLY } from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { Flex } from '../flex'
import { Text } from '../text'
import CompImage from './image'
import { checkError451, setError451 } from './utils'
import { memoStyles } from './styles'
import { Props as ImageProps, State } from './types'

export { ImageProps }

/** 默认请求头 */
const DEFAULT_HEADERS = {
  Referer: `${HOST}/`
}

/** 最大失败重试次数 */
const MAX_ERROR_COUNT = 5

/** 重试间隔 */
const RETRY_DISTANCE = 3000

/** bgm 封面域名 */
const OSS_BGM = 'https://lain.bgm.tv'

/** magma 域名图片后缀 */
const OSS_MEGMA_PREFIX = '/bgm_poster'

export const Image = observer(
  class ImageComponent extends React.Component<ImageProps, State> {
    static defaultProps = {
      style: undefined,
      imageStyle: undefined,
      src: undefined,
      size: 40,
      height: undefined,
      border: false,
      borderWidth: _.hairlineWidth,
      radius: undefined,
      shadow: false,
      placeholder: true,
      autoSize: 0,
      quality: true,
      imageViewer: false,
      imageViewerSrc: undefined,
      event: EVENT,
      delay: true,
      cache: true,
      headers: undefined,
      textOnly: TEXT_ONLY,
      onPress: undefined,
      onLongPress: undefined,
      onError: undefined
    }

    state = {
      error: false,
      uri: undefined,
      width: 0,
      height: 0
    }

    errorCount = 0
    timeoutId = null

    async componentDidMount() {
      const { src, cache, autoSize, textOnly } = this.props
      if (textOnly) return

      if (!cache) {
        this.setState({
          uri: src
        })
        return
      }

      await this.cache(src)
      if (autoSize) {
        setTimeout(() => {
          this.getSize()
        }, 0)
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { textOnly } = this.props
      if (textOnly) return
      if (nextProps.src !== this.props.src) this.cache(nextProps.src)
    }

    componentWillUnmount() {
      if (this.timeoutId) clearTimeout(this.timeoutId)
    }

    /**
     * 缓存图片
     */
    cache = async src => {
      let res
      let uri
      let qualityLevel
      if (this.props.quality) {
        const label = MODEL_SETTING_QUALITY.getLabel(systemStore.setting.quality)
        switch (label) {
          case 'WiFi下高质量':
            if (systemStore.wifi) qualityLevel = 'best'
            break

          case '高质量':
            qualityLevel = 'best'
            break

          case '低质量':
            qualityLevel = 'low'
            break

          default:
            break
        }
      }

      /**
       * @issue 安卓还没调试出怎么使用, 并且安卓貌似自带缓存?
       */
      if (IOS) {
        try {
          if (typeof src === 'string') {
            let _src = src
            if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
              _src = `https:${_src}`
            }
            _src = this.getQuality(_src, qualityLevel)

            // 空地址不作处理
            if (_src === 'https:') {
              this.comitError()
              return false
            }

            /**
             * 检查本地有没有图片缓存
             * @issue 这个地方没判断同时一个页面有相同图片, 同时检测本地地址的会触发unmounted
             * @issue to fixed
             */
            if (typeof _src === 'string' && _src.includes('https:/img/')) {
              this.comitError()
              return false
            }

            res = CacheManager.get(_src, {
              headers: this.headers
            }).getPath()
            const path = await res

            /**
             * magma的cdn要单独对第一次对象存储镜像做延迟处理
             * 需要再重新请求一遍
             * @date 202205009
             */
            if (
              typeof _src === 'string' &&
              _src.includes(OSS_MEGMA_PREFIX) &&
              path === undefined
            ) {
              // setTimeout(() => {
              //   this.retry(src)
              // }, RETRY_DISTANCE)
              this.onError()
            } else {
              this.setState({
                uri: path || _src
              })
            }
          }
        } catch (error) {
          this.retry(src)
        }
      } else {
        if (!IOS && typeof src === 'string') {
          if (checkError451(src)) {
            this.recoveryToBgmCover()
            return
          }
        }

        uri = src

        if (typeof uri === 'string') {
          uri = this.getQuality(uri, qualityLevel)
          if (uri.indexOf('https:') === -1 && uri.indexOf('http:') === -1) {
            uri = `https:${uri}`
          }
        }

        // 空地址不作处理
        if (uri === 'https:') return false

        this.setState({
          uri
        })
      }

      return res
    }

    /**
     * 图片是不是会下载失败, 当错误次数大于MAX_ERROR_COUNT就认为是错误
     */
    retry = (src: string) => {
      if (this.errorCount < MAX_ERROR_COUNT) {
        this.timeoutId = setTimeout(() => {
          this.errorCount += 1
          this.cache(src)
        }, 400)
      } else {
        this.timeoutId = null
        this.onError()
      }
    }

    /**
     * 选择图片质量
     */
    getQuality = (uri: string, qualityLevel = 'default') => {
      if (!uri) return ''
      if (qualityLevel === 'default') return uri

      /** 已废弃 */
      // if (qualityLevel === 'best') return getCoverLarge(uri)
      // if (qualityLevel === 'low') return getCoverSmall(uri)

      return uri
    }

    /**
     * 获取远程图片宽高
     */
    getSize = () => {
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
        this.setState({
          width: w,
          height: h
        })
      }

      RNImage.getSize(uri, cb)
    }

    /**
     * 加载失败
     */
    onError = async () => {
      const { src } = this.props
      if (
        typeof src === 'string' &&
        src.includes(OSS_MEGMA_PREFIX) &&
        this.errorCount < MAX_ERROR_COUNT
      ) {
        if (checkError451(src)) {
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
      }

      this.comitError()
    }

    recoveryToBgmCover = () => {
      const { src } = this.props
      if (typeof src !== 'string') return

      // 提取原来的封面图片地址
      let s = src.split('/pic/')?.[1] || ''
      if (s) s = s.replace(OSS_MEGMA_PREFIX, '')

      this.setState({
        uri: getCoverMedium(`${OSS_BGM}/pic/${s}`)
      })
    }

    comitError = () => {
      this.setState(
        {
          error: true
        },
        () => {
          const { onError } = this.props
          if (typeof onError === 'function') onError()
        }
      )
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
        return headers
      }

      if (typeof src === 'string' && src.includes('lain.')) {
        return DEFAULT_HEADERS
      }

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

      // 以state里面的width和height优先
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
        cache,
        fadeDuration,
        textOnly,
        onPress,
        onLongPress,
        onError,
        ...other
      } = this.props
      if (textOnly) {
        return (
          <Flex style={this.computedStyle.image} justify='center'>
            <Text style={this.styles.textOnly} type='sub' bold>
              text-only
            </Text>
          </Flex>
        )
      }

      const { error, uri } = this.state
      const { imageTransition } = systemStore.setting
      if (error) {
        // 错误显示本地的错误提示图片
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

      if (typeof src === 'string' || typeof src === 'undefined') {
        // 没有图片占位
        if (!uri) return <View style={this.computedStyle.image} />

        if (typeof uri === 'string') {
          // IOS使用了CacheManager管理图片, 请求时已加headers, 所以组件就不需要再加了
          if (IOS && imageTransition) {
            return (
              <AnimatedImage
                style={[
                  this.computedStyle.image,
                  {
                    width: this.props.width || this.props.size
                  }
                ]}
                // @ts-ignore
                headers={headers}
                tint={_.select('light', 'dark')}
                preview={_.select(IMG_EMPTY, IMG_EMPTY_DARK)}
                uri={uri}
                onError={this.onError}
                {...other}
              />
            )
          }

          if (!IOS && autoSize && !this.state.width) {
            return <View style={this.computedStyle.image} />
          }

          // 网络图片
          return (
            <CompImage
              style={this.computedStyle.image}
              source={{
                headers: this.headers,
                uri: uri.replace('http://', 'https://') // 安卓新版本不允许非https的图片了
              }}
              fadeDuration={this.fadeDuration}
              onError={this.onError}
              {...other}
            />
          )
        }
      }

      // 本地图片
      let source
      if (headers && typeof src === 'object') {
        source = {
          ...src,
          headers: this.headers
        }
      } else {
        source = src
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

    render() {
      const {
        src,
        imageViewer,
        imageViewerSrc,
        headers,
        event,
        delay,
        onPress,
        onLongPress
      } = this.props
      const { uri } = this.state
      let _onPress = onPress
      if (imageViewer) {
        _onPress = () => {
          let _imageViewerSrc = imageViewerSrc
          if (
            typeof _imageViewerSrc === 'string' &&
            _imageViewerSrc.indexOf('http') !== 0
          ) {
            _imageViewerSrc = undefined
          }

          const { id, data } = event
          t(id, {
            from: '封面图',
            ...data
          })
          showImageViewer([
            {
              url: _imageViewerSrc || uri,
              _url: _imageViewerSrc || src,
              headers
            }
          ])
        }
      }

      if (_onPress || onLongPress) {
        return (
          <View style={this.computedStyle.container}>
            <Touchable delay={delay} onPress={_onPress} onLongPress={onLongPress}>
              {this.renderImage()}
            </Touchable>
          </View>
        )
      }

      return <View style={this.computedStyle.container}>{this.renderImage()}</View>
    }

    get styles() {
      return memoStyles()
    }
  }
)
