/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 04:52:02
 */
import React from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { logger, r } from '@utils/dev'
import { applyLainProxy } from '@utils/proxy'
import { EVENT, HOST_CDN_AVATAR, IOS, WEB } from '@constants'
import { IOS_IPA, TEXT_ONLY } from '@src/config'
import { Component } from '../component'
import { devLog } from '../dev'
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
  clearErrorTimeout,
  computeImageStyles,
  fixedRemoteImageUrl,
  getAutoSize,
  getLocalCache,
  getLocalCacheStatic,
  getRecoveryBgmCover,
  imageViewerCallback,
  probeMagmaCdn,
  setError404,
  setError451,
  setErrorTimeout,
  timeoutPromise
} from './utils'
import {
  COMPONENT,
  DEFAULT_HEADERS,
  IMAGE_FADE_DURATION,
  MAX_ERROR_COUNT,
  OSS_MEGMA_PREFIX,
  RETRY_DISTANCE
} from './ds'
import { memoStyles } from './styles'

// 项目中若需要使用原本的 RN Image Component，也需在这里引入以便统一管理
export { RNImage }

import type { ImageErrorEvent } from 'react-native'
import type { Fn, TimerRef } from '@types'
import type { Props as ImageProps, State } from './types'
export type { ImageProps }

/** 图片组件，支持本地/远端图片、缓存、自动宽高、错误重试 */
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
      animFinished: false,
      error: false
    }

    /** 是否已挂载 */
    private _mounted = false

    /** 累计下载失败次数（用于短间隔重试） */
    private _errorCount = 0

    /** 短间隔重试定时器 */
    private _timeoutId: TimerRef = null

    /** 是否已获取远程图片宽高 */
    private _getSized = false

    /** 是否已回退到 props.fallbackSrc */
    private _fallbacked = false

    /** 是否已回退到 bgm 默认图 */
    private _recoveried = false

    /** 是否已触发 commitError（确定失败） */
    private _commited = false

    /** 所有定时器 id，组件销毁时统一清理 */
    private _timers: TimerRef[] = []

    /** 下载到本地的文件大小 (bytes) */
    private _size = 0

    /** 指数退避重试计数 */
    private _retryAttempt = 0

    /** 指数退避定时器 */
    private _retryTimer: TimerRef = null

    /** omit 结果缓存，src 不变时复用 */
    private _passProps: Partial<ImageProps> | null = null
    private _passPropsSrc: ImageProps['src'] = null

    /** headers 缓存 */
    private _headers: Record<string, string> | null = null
    private _headersSrc: ImageProps['src'] = undefined
    private _headersProps: Record<string, string> | undefined = undefined

    /** dev 模式 onLongPress 缓存 */
    private _devLongPress: Fn = null

    /** imageViewerCallback 缓存 */
    private _imageViewerHandle: Fn = null
    private _imageViewerUri: ImageProps['src'] = undefined

    componentDidMount() {
      this._mounted = true
      if (this.props.textOnly) return

      const { src } = this.props

      // 不缓存 / WEB 环境：直接用远端地址
      if (!this.props.cache || WEB) {
        this.setState({
          uri: fixedRemoteImageUrl(src)
        })
        return
      }

      // 本地图片：直接使用
      if (typeof src !== 'string') {
        this.setState({
          uri: src
        })
        return
      }

      // high 优先级立即加载，low 延迟 40ms
      const { priority } = this.props
      if (priority === 'high') {
        if (this.preGetLocalCache()) return
        return this.preCache()
      }

      this._timers.push(
        setTimeout(
          () => {
            if (this.preGetLocalCache()) return
            this.preCache()
          },
          priority === 'low' ? 40 : 0
        )
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
      this._mounted = false
      try {
        this._timers.forEach(id => clearTimeout(id))
        this._timers = []
        if (this._timeoutId) clearTimeout(this._timeoutId)
        if (this._retryTimer) clearTimeout(this._retryTimer)
      } catch {}
    }

    /** 本地已缓存则直接使用，跳过网络加载 */
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

    /** 缓存图片并检查自动宽高 */
    preCache = async () => {
      await this.cache(this.props.src)
      this.checkAutoSize()
    }

    /** 判断是否需要获取远程图片宽高 */
    checkAutoSize = () => {
      if (this.props.autoSize || this.props.autoHeight) {
        this._timers.push(
          setTimeout(() => {
            this.getSize()
          }, 0)
        )
      }
    }

    /** 缓存图片：安卓/iOS v2 走系统策略，iOS 原生走自定义下载 */
    cache = async (src: ImageProps['src']) => {
      if (!IOS || (IOS && systemStore.setting.iosImageCacheV2)) {
        return this.cacheWithSystemStrategy(src)
      }

      try {
        if (typeof src === 'string') {
          const fixedSrc = applyLainProxy(fixedRemoteImageUrl(src))

          // 空地址不作处理
          if (fixedSrc === 'https:' || fixedSrc.includes('https:/img/')) {
            this.commitError('error: cache')
            return false
          }

          // 头像 CDN 不稳定，加超时保护
          let path: string
          if (fixedSrc.includes(HOST_CDN_AVATAR)) {
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
            try {
              const result = (await Promise.race([
                getLocalCache(fixedSrc, this.headers),
                timeoutPromise()
              ])) as Awaited<ReturnType<typeof getLocalCache>>
              path = result?.path
              this._size = result?.size
            } catch (error) {
              setErrorTimeout(this.props.src)
              this.onError()
              return
            }
          }

          // magma CDN 首次镜像可能未就绪，触发重试
          if (fixedSrc.includes(OSS_MEGMA_PREFIX) && path === undefined) {
            this.onError()
          } else {
            const uri = path || fixedSrc
            if (this._mounted && this.state.uri !== uri) {
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

    /** 缓存图片，交给系统默认策略处理 */
    cacheWithSystemStrategy = async (src: ImageProps['src']) => {
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
        if (this._mounted) {
          this.setState({
            uri
          })
        }
      }

      return true
    }

    /** 短间隔重试，超过 MAX_ERROR_COUNT 则判定失败 */
    retry = (src: ImageProps['src']) => {
      if (this._errorCount < MAX_ERROR_COUNT) {
        this._timeoutId = setTimeout(() => {
          this._errorCount += 1
          this.cache(src)
        }, 400)
        this._timers.push(this._timeoutId)
        return
      }

      this._timeoutId = null
      this._timers.push(
        setTimeout(() => {
          this.onError()
        }, 0)
      )
    }

    /** 获取远程图片宽高（autoSize/autoHeight 时调用） */
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

      this._timers.push(
        setTimeout(() => {
          if (!this._mounted) return

          RNImage.getSizeWithHeaders(
            uri,
            this.headers,
            (width: number, height: number) => {
              if (!this._mounted) return

              this._getSized = true

              const sizes = getAutoSize(width, height, autoSize as number, autoHeight)
              this.setState({
                width: sizes.width,
                height: sizes.height
              })
            },
            () => {
              if (!this._mounted) return
              this.commitError('error: getSize')
            }
          )
        }, 0)
      )
    }

    /** 图片加载失败 */
    onError = async (evt?: ImageErrorEvent) => {
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

        this._timers.push(
          setTimeout(() => {
            probeMagmaCdn(src, this.headers, (code: number) => {
              if (!this._mounted) return

              if (code === 451) {
                setError451(src)
                this.recoveryToBgmCover()
              } else if (code === 404) {
                setError404(src)
                this.recoveryToBgmCover()
              } else if (code === -1) {
                // 探测超时（CDN 挂起）, 直接回退 bgm 原图, 不持久化标记
                this.recoveryToBgmCover()
              } else {
                this._timers.push(
                  setTimeout(() => {
                    this.retry(`${src}?ts=${getTimestamp()}`)
                  }, RETRY_DISTANCE)
                )
              }
            })
          }, 0)
        )
        return
      } else if (typeof src === 'string' && src.includes(OSS_MEGMA_PREFIX)) {
        // 重试耗尽，回退默认图
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

        // 本地文件损坏：重新下载
        if (errorInfo.includes('The file')) {
          this.setState({
            uri: fixedRemoteImageUrl(this.props.src)
          })
        } else {
          this.commitError(`error: onError [${errorInfo}]`)
        }
      }
    }

    /** 回退到 bgm 默认封面图 */
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

    /** 标记最终失败，触发错误回调 */
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

          logger.error(COMPONENT, 'commitError', errorInfo, this.props.src)
        }
      )
    }

    // ==================== 指数退避重试 ====================
    componentDidUpdate(_prevProps: Readonly<ImageProps>, prevState: Readonly<State>) {
      if (!prevState.error && this.state.error) {
        this.scheduleRetry()
      }
    }

    scheduleRetry = () => {
      const delay = Math.min(3000 * Math.pow(2, this._retryAttempt), 3600000)
      logger.warn(
        COMPONENT,
        'retry',
        this.props.src,
        `attempt=${this._retryAttempt} delay=${delay}`
      )
      this._retryAttempt += 1

      this._retryTimer = setTimeout(() => {
        if (!this._mounted) return
        this._commited = false
        this._errorCount = 0
        this._recoveried = false
        this._fallbacked = false
        if (typeof this.props.src === 'string') clearErrorTimeout(this.props.src)
        this.setState(
          {
            error: false,
            uri: undefined
          },
          () => {
            this.cache(this.props.src)
          }
        )
      }, delay)
    }

    /** 图片加载结束（成功或失败都会触发） */
    onLoadEnd = () => {
      if (!this._mounted) return

      // _commited=true 说明 onError 已触发（失败），不重置退避计数
      if (!this._commited) {
        this._retryAttempt = 0
      }

      const { fadeDuration } = this.props
      this.setState(
        {
          loaded: true
        },
        () => {
          const { onLoadEnd } = this.props
          if (typeof onLoadEnd === 'function') onLoadEnd()

          if (IOS) return

          // 无动画：直接完成
          if (fadeDuration === 0) {
            this.setState({
              animFinished: true
            })
            return
          }

          // 有动画：等动画结束后移除背景色
          this._timers.push(
            setTimeout(() => {
              if (this._mounted) {
                this.setState({
                  animFinished: true
                })
              }
            }, IMAGE_FADE_DURATION + 400)
          )
        }
      )
    }

    /** 请求头：lain 域名自动加 UA */
    get headers(): Record<string, string> {
      const { src, headers } = this.props
      if (this._headersSrc === src && this._headersProps === headers && this._headers) {
        return this._headers
      }

      this._headersSrc = src
      this._headersProps = headers

      if (headers) {
        if (typeof src === 'string' && src.includes('lain.')) {
          this._headers = { ...DEFAULT_HEADERS, ...(headers || {}) }
          return this._headers
        }

        this._headers = { ...headers }
        return this._headers
      }

      if (typeof src === 'string' && src.includes('lain.')) {
        this._headers = DEFAULT_HEADERS
        return this._headers
      }

      this._headers = {}
      return this._headers
    }

    /** 合并计算最终样式 */
    get computedStyle() {
      return computeImageStyles(
        this.props,
        this.state,
        this.borderRadius,
        this.dev,
        this._fallbacked,
        this._size,
        this.styles
      )
    }

    /** 当前圆角值 */
    get borderRadius() {
      return systemStore.coverRadius || _.radiusXs
    }

    /** 是否开发模式 */
    get dev() {
      return systemStore.dev
    }

    renderImage() {
      const { image: imageStyle, container: containerStyle } = this.computedStyle

      if (this.props.textOnly) return <TextOnly style={imageStyle} />

      // 加载失败：显示错误图标
      if (this.state.error && !WEB) {
        return <Error style={imageStyle} size={this.props.width || this.props.size} />
      }

      if (this._passPropsSrc !== this.props.src) {
        this._passPropsSrc = this.props.src
        this._passProps = omit(this.props, [
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
      }
      const otherProps = this._passProps
      const { src } = this.props
      if (typeof src === 'string' || typeof src === 'undefined') {
        const { uri } = this.state

        // 无 URI：显示占位
        if (!uri) return <Placeholder style={imageStyle} />

        if (typeof uri === 'string') {
          const { autoSize, autoHeight } = this.props

          // 安卓 autoSize 场景：宽高未获取完前显示占位
          if (
            !(IOS || WEB) &&
            ((autoSize && !this.state.width) || (autoHeight && !this.state.height))
          ) {
            return <Placeholder style={imageStyle} />
          }

          const finalUri = applyLainProxy(uri)
          return (
            <Remote
              {...otherProps}
              style={imageStyle}
              containerStyle={containerStyle}
              headers={this.headers}
              uri={finalUri}
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

      // 本地图片直接渲染
      return (
        <Local
          {...otherProps}
          style={imageStyle}
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
      const { container: containerStyle } = this.computedStyle

      let onLongPress = this.props.onLongPress
      if (this.dev) {
        if (!this._devLongPress) {
          this._devLongPress = () => {
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
        }
        onLongPress = this._devLongPress
      }

      return (
        <Component id='component-image' style={containerStyle}>
          <Touchable
            delay={this.props.delay}
            scale={this.props.scale}
            withoutFeedback={this.props.withoutFeedback}
            onPress={onPress}
            onLongPress={onLongPress}
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

      // ImageViewer 模式：点击打开大图
      if (this.props.imageViewer) {
        if (this._imageViewerUri !== this.state.uri) {
          this._imageViewerUri = this.state.uri
          this._imageViewerHandle = imageViewerCallback({
            imageViewerSrc: this.props.imageViewerSrc,
            headers: this.headers,
            src: this.props.src,
            uri: this.state.uri,
            event: this.props.event
          })
        }
        onPressHandle = this._imageViewerHandle
      }

      // 有交互事件：包裹 Touchable
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
