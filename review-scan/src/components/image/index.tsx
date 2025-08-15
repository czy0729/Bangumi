/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:11:04
 */
import React from 'react'
import { Image as RNImage, ImageErrorEventData, NativeSyntheticEvent } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { getTimestamp, omit, pick } from '@utils'
import { r } from '@utils/dev'
import { EVENT, FROZEN_FN, HOST_CDN_AVATAR, IOS, WEB } from '@constants'
import { IOS_IPA, TEXT_ONLY } from '@src/config'
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
  checkErrorTimeout,
  checkLocalError,
  fixedRemoteImageUrl,
  getAutoSize,
  getDevStyles,
  getLocalCache,
  getLocalCacheStatic,
  getRecoveryBgmCover,
  imageViewerCallback,
  log,
  setError404,
  setError451,
  setErrorTimeout,
  timeoutPromise
} from './utils'
import { COMPONENT, DEFAULT_HEADERS, MAX_ERROR_COUNT, OSS_MEGMA_PREFIX, RETRY_DISTANCE } from './ds'
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
    static defaultProps: ImageProps = {
      autoSize: 0,
      border: false,
      borderWidth: _.hairlineWidth,
      cache: !WEB,
      delay: !WEB,
      event: EVENT,
      imageViewer: false,
      withoutFeedback: false,
      placeholder: true,
      shadow: false,
      size: 40,
      textOnly: TEXT_ONLY,
      priority: 'normal',
      skeleton: true
    }

    state: State = {
      uri: WEB ? fixedRemoteImageUrl(this.props.src) : undefined,
      width: 0,
      height: 0,
      loaded: false,
      error: false
    }

    /** 图片下载失败次数 */
    _errorCount = 0

    /** 图片下载失败重试间隔 */
    _timeoutId = null

    /** 是否已获取远程图片宽高 */
    _getSized = false

    /** 是否已回退到 props.fallback 地址 */
    _fallbacked = false

    /** 是否已回退到 bgm 源头  */
    _recoveried = false

    /** 是否已确定加载失败 */
    _commited = false

    /** 当前图片大小 */
    _size = 0

    componentDidMount() {
      if (this.props.textOnly) return

      const { src } = this.props

      // 不缓存图片
      if (!this.props.cache || WEB) {
        this.setState({
          uri: fixedRemoteImageUrl(src)
        })
        return
      }

      // 本地图片
      if (typeof src !== 'string') {
        this.setState({
          uri: src
        })
        return
      }

      // 优先响应图片
      const { priority } = this.props
      if (priority === 'high') {
        if (this.preGetLocalCache()) return
        return this.preCache()
      }

      setTimeout(
        () => {
          if (this.preGetLocalCache()) return
          this.preCache()
        },
        priority === 'low' ? 40 : 0
      )
    }

    UNSAFE_componentWillReceiveProps(nextProps: { src: ImageProps['src'] }) {
      if (this.props.textOnly) return

      if (nextProps.src !== this.props.src) {
        if (WEB) {
          this.setState({
            uri: fixedRemoteImageUrl(nextProps.src)
          })
          return
        }

        this.cache(nextProps.src)
      }
    }

    componentWillUnmount() {
      try {
        if (this._timeoutId) clearTimeout(this._timeoutId)
      } catch (error) {}
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
      if (this.props.autoSize || this.props.autoHeight) {
        setTimeout(() => {
          this.getSize()
        }, 0)
      }
    }

    /** 缓存图片 */
    cache = async (src: ImageProps['src']) => {
      // 通常只有安卓走 V2 流程
      if (!IOS || (IOS && systemStore.setting.iosImageCacheV2)) {
        return this.cacheV2(src)
      }

      try {
        if (typeof src === 'string') {
          const fixedSrc = fixedRemoteImageUrl(src)

          // 空地址不作处理
          if (
            fixedSrc === 'https:' ||
            (typeof fixedSrc === 'string' && fixedSrc.includes('https:/img/'))
          ) {
            this.commitError('error: cache')
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
              setErrorTimeout(this.props.src)
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
                uri
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
      if (typeof src === 'string') {
        if (checkLocalError(src)) {
          this.recoveryToBgmCover()
          return
        }

        if (checkErrorTimeout(src)) {
          this.onError()
          return
        }
      }

      let uri: ImageProps['src'] = src || ''
      if (typeof uri === 'string' && !uri.startsWith('./') && !/^https?:/.test(uri)) {
        uri = `https:${uri}`
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
      const uri = this.state.uri || this.props.src
      if (
        typeof uri !== 'string' ||
        (typeof autoSize !== 'number' && typeof autoHeight !== 'number')
      ) {
        return
      }

      setTimeout(() => {
        RNImage.getSizeWithHeaders(
          uri,
          this.headers,
          (width: number, height: number) => {
            this._getSized = true

            const sizes = getAutoSize(width, height, autoSize, autoHeight)
            this.setState({
              width: sizes.width,
              height: sizes.height
            })
          },
          () => {
            this.commitError('error: getSize')
          }
        )
      }, 0)
    }

    /** 加载失败 */
    onError = async (evt?: NativeSyntheticEvent<ImageErrorEventData>) => {
      const { src } = this.props
      if (
        typeof src === 'string' &&
        src.includes(OSS_MEGMA_PREFIX) &&
        this._errorCount < MAX_ERROR_COUNT
      ) {
        if (checkLocalError(src)) {
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
            RNImage.getSizeWithHeaders(src, this.headers, FROZEN_FN, error => {
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
            })
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
      if (fallbackSrc && this.state.uri !== fallbackSrc && !this._fallbacked) {
        this._fallbacked = true
        this.setState({
          uri: fixedRemoteImageUrl(fallbackSrc)
        })
      } else {
        const errorInfo = String(evt?.nativeEvent?.error || '')

        // 本地缓存了不能正常读取的图片文件
        if (errorInfo.includes('The file')) {
          this.setState({
            uri: fixedRemoteImageUrl(this.props.src)
          })
        } else {
          this.commitError(`error: onError [${errorInfo}]`)
        }
      }
    }

    /** 其他源头回退到 bgm 源头 */
    recoveryToBgmCover = () => {
      if (this._recoveried) return

      const { src, fallbackSrc } = this.props
      if (typeof src !== 'string') return

      this._recoveried = true
      if (fallbackSrc) {
        this.setState({
          uri: fixedRemoteImageUrl(fallbackSrc)
        })
        return
      }

      this.setState({
        uri: getRecoveryBgmCover(src, this.props.width, this.props.height, this.props.size)
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
          width: w || (WEB ? 'auto' : 160),
          height: h || (WEB ? 'auto' : 160)
        })
      } else if (autoHeight) {
        image.push({
          width: w || (WEB ? 'auto' : 160),
          height: h || (WEB ? 'auto' : 160)
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
      return systemStore.coverRadius || _.radiusXs
    }

    /** 开发模式 */
    get dev() {
      return systemStore.dev
    }

    renderImage() {
      if (this.props.textOnly) return <TextOnly style={this.computedStyle.image} />

      // 加载错误后显示显示图形
      if (this.state.error && !WEB) {
        return <Error style={this.computedStyle.image} size={this.props.width || this.props.size} />
      }

      const otherProps = omit(this.props, [
        'style',
        'imageStyle',
        'src',
        'size',
        'height',
        'border',
        'borderWidth',
        'radius',
        'shadow',
        'placeholder',
        'autoSize',
        'autoHeight',
        'imageViewer',
        'imageViewerSrc',
        'withoutFeedback',
        'headers',
        'event',
        'delay',
        'scale',
        'cache',
        'fadeDuration',
        'errorToHide',
        'skeleton',
        'skeletonType',
        'textOnly',
        'priority',
        'onPress',
        'onLongPress',
        'onError'
      ])
      const { src } = this.props
      if (typeof src === 'string' || typeof src === 'undefined') {
        const { uri } = this.state

        // 显示图片占位
        if (!uri) return <Placeholder style={this.computedStyle.image} />

        if (typeof uri === 'string') {
          const { autoSize, autoHeight } = this.props

          // 获取图片的宽高中, 占位
          if (
            !(IOS || WEB) &&
            ((autoSize && !this.state.width) || (autoHeight && !this.state.height))
          ) {
            return <Placeholder style={this.computedStyle.image} />
          }

          // 网络图片
          return (
            <Remote
              {...otherProps}
              style={this.computedStyle.image}
              containerStyle={this.computedStyle.container}
              headers={this.headers}
              uri={uri}
              autoSize={autoSize}
              autoHeight={autoHeight}
              fadeDuration={this.props.fadeDuration}
              priority={this.props.priority}
              onError={this.onError}
              onLoadEnd={this.onLoadEnd}
            />
          )
        }
      }

      // 本地图片
      return (
        <Local
          {...otherProps}
          style={this.computedStyle.image}
          headers={this.props.headers}
          overrideHeaders={this.headers}
          src={src}
          onError={this.onError}
          onLoadEnd={this.onLoadEnd}
        />
      )
    }

    renderSkeleton() {
      if (IOS_IPA || !this.props.skeleton) return null

      return (
        <Skeleton
          style={this.computedStyle.image}
          uri={this.state.uri}
          type={this.props.skeletonType}
          textOnly={this.props.textOnly}
          placeholder={this.props.placeholder}
          loaded={this.state.loaded}
        />
      )
    }

    renderTouchableImage(onPress: Fn) {
      return (
        <Component id='component-image' style={this.computedStyle.container}>
          <Touchable
            delay={this.props.delay}
            scale={this.props.scale}
            withoutFeedback={this.props.withoutFeedback}
            onPress={onPress}
            onLongPress={
              this.dev
                ? () => {
                    devLog(
                      JSON.stringify(
                        {
                          _size: `${Math.floor(this._size / 1024)} kb`,
                          ...pick(this, [
                            '_errorCount',
                            '_timeoutId',
                            '_getSized',
                            '_fallbacked',
                            '_recoveried',
                            '_commited'
                          ]),
                          ...this.props,
                          ...this.state
                        },
                        null,
                        2
                      )
                    )
                  }
                : this.props.onLongPress
            }
          >
            {this.renderImage()}
          </Touchable>
          {this.renderSkeleton()}
        </Component>
      )
    }

    render() {
      r(COMPONENT)

      if (this.state.error && this.props.errorToHide) return null

      let onPressHandle = this.props.onPress

      // 需要调用 ImageViewer 弹窗
      if (this.props.imageViewer) {
        onPressHandle = imageViewerCallback({
          imageViewerSrc: this.props.imageViewerSrc,
          headers: this.headers,
          src: this.props.src,
          uri: this.state.uri,
          event: this.props.event
        })
      }

      // 带点击事件
      if (this.dev || onPressHandle || this.props.onLongPress) {
        return this.renderTouchableImage(onPressHandle)
      }

      return (
        <Component id='component-image' style={this.computedStyle.container}>
          {this.renderImage()}
          {this.renderSkeleton()}
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

export default Image
