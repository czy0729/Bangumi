/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 20:58:58
 */
import React from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { getCover400, getTimestamp } from '@utils'
import { r } from '@utils/dev'
import { HOST_CDN_AVATAR, IOS, STORYBOOK } from '@constants'
import { IOS_IPA } from '@/config'
import { AnyObject, Fn } from '@types'
import { Component } from '../component'
import { devLog } from '../dev'
import { getSkeletonColor } from '../skeleton'
import { Touchable } from '../touchable'
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
  getLocalCache,
  getLocalCacheStatic,
  imageViewerCallback,
  log,
  setError404,
  setError451,
  setErrorTimeout,
  timeoutPromise
} from './utils'
import {
  COMPONENT,
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

/**
 * 图片
 *  - 支持各种样式设置
 *  - 支持本地和远端图片
 *  - 图片缓存到本地
 *  - 远端图片自动获取高度
 *  - 错误处理
 *  - 自动选择 Bangumi 图片质量
 *  - 联动 ImageViewer
 *  - 支持 @magma 提供的 [bgm_poster] 后缀
 *  - iOS 环境下, Expo 浏览暂时不使用 cacheV2
 */
export const Image = observer(
  class ImageComponent extends React.Component<ImageProps, State> {
    static defaultProps: ImageProps = DEFAULT_PROPS

    state: State = {
      uri: STORYBOOK ? fixedRemoteImageUrl(this.props.src) : undefined,
      width: 0,
      height: 0,
      loaded: false,
      error: false
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

      if (this.preGetLocalCache()) return

      /** 若同一时间存在大量低速度图片, 会把整个运行时卡住, 暂时使用 setTimeout 处理 */
      if (sync) return this.preCache()

      setTimeout(() => {
        this.preCache()
      }, 0)
    }

    UNSAFE_componentWillReceiveProps(nextProps: { src: ImageProps['src'] }) {
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

    /** 若图片已明确知道在本地有缓存, 忽略大部分预置规则, 直接取出渲染 */
    preGetLocalCache = () => {
      const { src } = this.props
      if (typeof src === 'string') {
        const result = getLocalCacheStatic(src)
        if (result) {
          this._size = result.size || 0
          this.setState({
            uri: result.path
          })
          this.checkAutoSize()
          return true
        }
      }
    }

    /** 预加载的规则 */
    preCache = async () => {
      await this.cache(this.props.src)
      this.checkAutoSize()
    }

    /** 判断是否需要获取远程图片宽高 */
    checkAutoSize = () => {
      const { autoSize, autoHeight } = this.props
      if (autoSize || autoHeight) {
        setTimeout(() => {
          this.getSize()
        }, 0)
      }
    }

    /** 缓存图片 */
    cache = async (src: ImageProps['src']) => {
      if (!IOS || (IOS && systemStore.setting.iosImageCacheV2)) return this.cacheV2(src)

      try {
        if (typeof src === 'string') {
          const fixedSrc = fixedRemoteImageUrl(src)

          // 空地址不作处理
          if (fixedSrc === 'https:') {
            this.commitError('error: cache 1')
            return false
          }

          /**
           * 检查本地有没有图片缓存
           * @issue 这个地方没判断同时一个页面有相同图片, 同时检测本地地址的会触发 unmounted
           */
          if (typeof fixedSrc === 'string' && fixedSrc.includes('https:/img/')) {
            this.commitError('error: cache 2')
            return false
          }

          /** 头像 CDN 目前尚未稳定, 发现了图片损坏下载不能的现象 (暂时写了超时应对) */
          let path: string
          if (typeof fixedSrc === 'string' && fixedSrc.includes(HOST_CDN_AVATAR)) {
            try {
              await Promise.race([
                new Promise(async resolve => {
                  const result = await getLocalCache(fixedSrc, this.headers)
                  path = result?.path
                  this._size = result?.size
                  resolve(true)
                }),
                timeoutPromise()
              ])
            } catch (error) {
              if (typeof this.props.src === 'string') setErrorTimeout(this.props.src)
              this.onError()
              return
            }
          } else {
            const result = await getLocalCache(fixedSrc, this.headers)
            path = result?.path
            this._size = result?.size
          }

          /**
           * magma 的 cdn 要单独对第一次对象存储镜像做延迟处理, 需要再重新请求一遍
           * @date 20220509
           */
          if (
            typeof fixedSrc === 'string' &&
            fixedSrc.includes(OSS_MEGMA_PREFIX) &&
            path === undefined
          ) {
            this.onError()
          } else {
            const uri = path || fixedSrc
            if (this.state.uri !== uri) {
              this.setState({
                uri: path || fixedSrc
              })
            }
          }
        }
      } catch (error) {
        this.retry(src)
      }
    }

    /** 缓存图片 (使用系统默认图片策略) */
    cacheV2 = async (src: ImageProps['src']) => {
      let uri: ImageProps['src']
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

      uri = src || ''
      if (typeof uri === 'string') {
        if (uri.indexOf('https:') === -1 && uri.indexOf('http:') === -1) {
          uri = `https:${uri}`
        }
      }

      // 空地址不作处理
      if (uri === 'https:') return false

      if (uri) {
        if (typeof uri === 'string' && !IOS) getLocalCache(uri)
        this.setState({
          uri
        })
      }

      return true
    }

    /** 图片是不是会下载失败, 当错误次数大于 MAX_ERROR_COUNT 就认为是错误 */
    retry = (src: ImageProps['src']) => {
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

      const { autoSize, autoHeight } = this.props
      const { uri } = this.state
      if (
        typeof uri !== 'string' ||
        (typeof autoSize !== 'number' && typeof autoHeight !== 'number')
      ) {
        return
      }

      const cb = (width: number, height: number) => {
        let w: number
        let h: number
        if (autoSize && typeof autoSize === 'number') {
          // 假如图片本身的宽度没有超过给定的最大宽度, 直接沿用图片原尺寸
          if (width < autoSize) {
            w = width
            h = height
          } else {
            w = autoSize
            h = Math.floor((autoSize / width) * height)
          }
        } else {
          w = Math.floor((autoHeight / height) * width)
          h = autoHeight
        }

        this._getSized = true
        this.setState({
          width: w,
          height: h
        })
      }

      setTimeout(() => {
        RNImage.getSizeWithHeaders(uri, this.headers, cb, () => {
          this.commitError('error: getSizeWithHeaders')
        })
      }, 0)
    }

    /** 加载失败 */
    onError = async () => {
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
            RNImage.getSizeWithHeaders(
              src,
              this.headers,
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
        this.commitError('error: onError')
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
      const width = Math.max(this.props.width || 0, this.props.height || 0, this.props.size || 0)
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
    commitError = (errorInfo?: string) => {
      if (this._commited) return

      this._commited = true
      this.setState(
        {
          error: true
        },
        () => {
          const { onError } = this.props
          if (typeof onError === 'function') onError()
          log('commitError', errorInfo, this.props.src)
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
        autoHeight,
        autoSize,
        border,
        borderWidth,
        height,
        placeholder,
        radius,
        shadow,
        size,
        skeleton,
        skeletonType
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
      } else if (autoHeight) {
        image.push({
          width: w || (STORYBOOK ? 'auto' : 160),
          height: h || 160
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

      if (placeholder) {
        if (skeleton) {
          container.push({
            backgroundColor: getSkeletonColor(skeletonType)
          })
        } else {
          container.push(this.styles.placeholder)
        }
      }

      if (style) container.push(style)
      if (imageStyle) {
        container.push(imageStyle)
        image.push(imageStyle)
      }

      if (this.dev) {
        image.push(getDevStyles(this.props.src, this._fallbacked, this._size))
      }

      return {
        container: _.flatten(container),
        image: _.flatten(image)
      }
    }

    /** 圆角 */
    get borderRadius() {
      return systemStore.setting.coverRadius || _.radiusXs
    }

    /** 开发模式 */
    get dev() {
      return systemStore.dev
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
        autoHeight,
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
        skeleton,
        skeletonType,
        textOnly,
        onPress,
        onLongPress,
        onError,
        ...other
      } = this.props
      if (textOnly) return <TextOnly style={this.computedStyle.image} />

      const { error, uri } = this.state
      if (error) {
        // 加载错误后销毁容器
        if (errorToHide) return null

        // 加载错误后显示显示图形
        if (!STORYBOOK) {
          return (
            <Error style={this.computedStyle.image} size={this.props.width || this.props.size} />
          )
        }
      }

      if (typeof src === 'string' || typeof src === 'undefined') {
        // 显示图片占位
        if (!uri) return <Placeholder style={this.computedStyle.image} />

        if (typeof uri === 'string') {
          // 获取图片的宽高中, 占位
          if (
            !(IOS || STORYBOOK) &&
            ((autoSize && !this.state.width) || (autoHeight && !this.state.height))
          ) {
            return <Placeholder style={this.computedStyle.image} />
          }

          // 网络图片
          return (
            <Remote
              {...other}
              style={this.computedStyle.image}
              containerStyle={this.computedStyle.container}
              headers={this.headers}
              uri={uri}
              autoSize={autoSize}
              autoHeight={autoHeight}
              fadeDuration={fadeDuration}
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
        skeletonType,
        withoutFeedback,
        onLongPress
      } = this.props
      const { loaded } = this.state
      const onLongPressHandle = this.dev
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
      return (
        <Component id='component-image' style={this.computedStyle.container}>
          <Touchable
            delay={delay}
            scale={scale}
            withoutFeedback={withoutFeedback}
            onPress={onPress}
            onLongPress={onLongPressHandle}
          >
            {this.renderImage()}
          </Touchable>
          {!IOS_IPA && skeleton && (
            <Skeleton
              style={this.computedStyle.image}
              type={skeletonType}
              textOnly={textOnly}
              placeholder={placeholder}
              loaded={loaded}
            />
          )}
        </Component>
      )
    }

    render() {
      r(COMPONENT)

      const {
        src,
        textOnly,
        placeholder,
        imageViewer,
        imageViewerSrc,
        skeleton,
        skeletonType,
        event,
        onPress,
        onLongPress
      } = this.props
      const { uri, loaded } = this.state
      let onPressHandle = onPress

      // 需要调用 ImageViewer 弹窗
      if (imageViewer) {
        onPressHandle = imageViewerCallback({
          imageViewerSrc,
          uri,
          src,
          headers: this.headers,
          event
        })
      }

      // 带点击事件
      if (this.dev || onPressHandle || onLongPress) return this.renderTouchableImage(onPressHandle)

      return (
        <Component id='component-image' style={this.computedStyle.container}>
          {this.renderImage()}
          {!IOS_IPA && skeleton && (
            <Skeleton
              style={this.computedStyle.image}
              type={skeletonType}
              textOnly={textOnly}
              placeholder={placeholder}
              loaded={loaded}
            />
          )}
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
