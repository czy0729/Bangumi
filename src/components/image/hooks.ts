/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 15:38:23
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image as RNImage } from 'react-native'
import { getTimestamp } from '@utils'
import { logger } from '@utils/dev'
import { applyLainProxy } from '@utils/proxy'
import { invalidate } from '@utils/thirdParty/image-cache-manager'
import { IOS, WEB } from '@constants'
import {
  checkLocalError,
  computeHeaders,
  fixedRemoteImageUrl,
  getAutoSize,
  getLocalCache,
  getLocalCacheStatic,
  getNextRetryDelay,
  getRecoveryBgmCover,
  probeMagmaCdn,
  removeLocalCache,
  setError404,
  setError451
} from './utils'
import {
  COMPONENT,
  IMAGE_FADE_DURATION,
  MAX_ERROR_COUNT,
  OSS_MEGMA_PREFIX,
  RETRY_DISTANCE
} from './ds'

import type { ImageErrorEvent } from 'react-native'
import type { TimerRef } from '@types'
import type { Props as ImageProps, State, UseImageAutoSizeOptions } from './types'

/** 计时器注册表, 组件卸载时统一清理 */
export function useTimerRegistry() {
  const timersRef = useRef<TimerRef[]>([])

  useEffect(() => {
    return () => {
      try {
        timersRef.current.forEach(id => clearTimeout(id))
        timersRef.current = []
      } catch {}
    }
  }, [])

  const push = useCallback((id: TimerRef) => {
    if (id) timersRef.current.push(id)
  }, [])

  return push
}

/** 请求头: lain 域名自动加 Referer */
export function useImageHeaders(
  src: ImageProps['src'],
  headers?: Record<string, string>
): Record<string, string> {
  return useMemo(() => computeHeaders(src, headers), [src, headers])
}

/**
 * 获取远程图片宽高 (autoSize/autoHeight)
 * uri 就绪后触发一次, 成功后不再重复获取
 */
export function useImageAutoSize(options: UseImageAutoSizeOptions) {
  const { uri, src, autoSize, autoHeight, headers, onSize, onError } = options

  /** 已完成测量的 uri, 同一地址只测一次, 换图自动允许重新测量 */
  const sizedUriRef = useRef<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!autoSize && !autoHeight) return
    // autoSize 为 boolean true 且 autoHeight 无数值配值时无法计算目标宽度, 跳过
    if (typeof autoSize !== 'number' && !autoHeight) return

    const finalUri = uri || src
    if (typeof finalUri !== 'string') return
    if (sizedUriRef.current === finalUri) return

    const timerId = setTimeout(() => {
      if (!mountedRef.current) return

      RNImage.getSizeWithHeaders(
        finalUri,
        headers,
        (width: number, height: number) => {
          if (!mountedRef.current) return

          sizedUriRef.current = finalUri

          const sizes = getAutoSize(width, height, autoSize as number, autoHeight)
          onSize(sizes.width, sizes.height)
        },
        () => {
          if (!mountedRef.current) return
          onError('error: getSize')
        }
      )
    }, 0)

    return () => clearTimeout(timerId)
  }, [uri, src, autoSize, autoHeight, headers, onSize, onError])
}

/**
 * 图片加载状态机: uri 解析、错误重试、退避、加载完成动画
 * 所有跨渲染的可变状态收进 ref, 回调以最新 ref 读取, 引用稳定
 */
export function useImageLoader(props: ImageProps, headers: Record<string, string>) {
  const { src, priority } = props

  const [state, setState] = useState<State>(() => ({
    uri: WEB ? fixedRemoteImageUrl(src) : undefined,
    width: 0,
    height: 0,
    loaded: false,
    animFinished: false,
    error: false
  }))

  /** 是否已挂载 */
  const mountedRef = useRef(false)

  /** 累计下载失败次数（用于短间隔重试） */
  const errorCountRef = useRef(0)

  /** 是否已回退到 props.fallbackSrc */
  const fallbackedRef = useRef(false)

  /** 是否已回退到 bgm 默认图 */
  const recoveriedRef = useRef(false)

  /** 是否已触发 commitError（确定失败） */
  const commitedRef = useRef(false)

  /** 下载到本地的文件大小 (bytes) */
  const sizeRef = useRef(0)

  /** 指数退避重试计数 */
  const retryAttemptRef = useRef(0)

  /** 最新图片地址, 供回调内读取 */
  const uriRef = useRef<State['uri']>(state.uri)

  /** 最新 props / headers, 供零依赖回调内读取 */
  const propsRef = useRef(props)
  const headersRef = useRef(headers)

  /** cache 函数引用, 打破 retry ↔ cache 声明顺序循环 */
  const cacheRef = useRef<((src: ImageProps['src']) => void) | null>(null)

  const pushTimer = useTimerRegistry()

  // ==================== 挂载与同步 ====================

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    propsRef.current = props
    headersRef.current = headers
  })

  useEffect(() => {
    uriRef.current = state.uri
  }, [state.uri])

  const setUri = useCallback((uri: State['uri']) => {
    uriRef.current = uri
    setState(s => (s.uri === uri ? s : { ...s, uri }))
  }, [])

  // ==================== 内部流程 ====================
  // 全部转为稳定 useCallback: 仅触达 ref 与函数式 setState, 无过期闭包问题

  /** 本地已缓存则直接使用, 跳过网络加载 */
  const preGetLocalCache = useCallback(() => {
    const { src } = propsRef.current
    if (typeof src === 'string') {
      const result = getLocalCacheStatic(src)
      if (result) {
        sizeRef.current = result.size || 0
        setUri(result.path)
        return true
      }
    }
  }, [setUri])

  /** 回退到 bgm 默认封面图 */
  const recoveryToBgmCover = useCallback(() => {
    if (recoveriedRef.current) return

    const { src, fallbackSrc, width, height, size } = propsRef.current
    if (typeof src !== 'string') return

    recoveriedRef.current = true
    if (fallbackSrc) {
      setUri(fixedRemoteImageUrl(fallbackSrc))
      return
    }

    setUri(getRecoveryBgmCover(src, width, height, size))
  }, [setUri])

  /** 标记最终失败, 触发错误回调与指数退避重试 */
  const commitError = useCallback((errorInfo?: string) => {
    if (commitedRef.current) return

    commitedRef.current = true
    logger.error(COMPONENT, 'commitError', errorInfo, propsRef.current.src)
    setState(s => (s.error ? s : { ...s, error: true }))
  }, [])

  /** 最新 handleError, 供声明顺序在前的 retry / cache 调用 */
  const handleErrorRef = useRef<((evt?: ImageErrorEvent) => void) | null>(null)

  /** 短间隔重试, 超过 MAX_ERROR_COUNT 则判定失败 */
  const retry = useCallback(
    (src: ImageProps['src']) => {
      if (errorCountRef.current < MAX_ERROR_COUNT) {
        pushTimer(
          setTimeout(() => {
            errorCountRef.current += 1
            cacheRef.current?.(src)
          }, 400)
        )
        return
      }

      pushTimer(
        setTimeout(() => {
          handleErrorRef.current?.()
        }, 0)
      )
    },
    [pushTimer]
  )

  /** 图片加载失败 */
  const handleError = useCallback(
    (evt?: ImageErrorEvent) => {
      const { src, fallbackSrc } = propsRef.current

      if (typeof src === 'string' && src.includes(OSS_MEGMA_PREFIX)) {
        if (errorCountRef.current < MAX_ERROR_COUNT) {
          if (checkLocalError(src)) {
            recoveryToBgmCover()
            return
          }

          pushTimer(
            setTimeout(() => {
              probeMagmaCdn(src, headersRef.current, (code: number) => {
                if (!mountedRef.current) return

                if (code === 451) {
                  setError451(src)
                  recoveryToBgmCover()
                } else if (code === 404) {
                  setError404(src)
                  recoveryToBgmCover()
                } else if (code === -1) {
                  // 探测超时（CDN 挂起）, 直接回退 bgm 原图, 不持久化标记
                  recoveryToBgmCover()
                } else {
                  pushTimer(
                    setTimeout(() => {
                      retry(`${src}?ts=${getTimestamp()}`)
                    }, RETRY_DISTANCE)
                  )
                }
              })
            }, 0)
          )
          return
        }

        // 重试耗尽, 回退默认图
        setError404(src)
        recoveryToBgmCover()
        return
      }

      if (fallbackSrc && uriRef.current !== fallbackSrc && !fallbackedRef.current) {
        fallbackedRef.current = true
        setUri(fixedRemoteImageUrl(fallbackSrc))
        return
      }

      const errorInfo = String(evt?.nativeEvent?.error || '')

      // 本地文件损坏: 移除内存命中记录与磁盘索引, 回退远端地址重新下载
      if (errorInfo.includes('The file')) {
        if (typeof src === 'string') {
          const fixedSrc = applyLainProxy(fixedRemoteImageUrl(src))
          removeLocalCache(fixedSrc)
          invalidate(fixedSrc)
        }
        setUri(fixedRemoteImageUrl(propsRef.current.src))
      } else {
        commitError(`error: onError [${errorInfo}]`)
      }
    },
    [pushTimer, commitError, retry, recoveryToBgmCover, setUri]
  )

  useEffect(() => {
    handleErrorRef.current = handleError
  })

  /** 缓存图片: 直接使用远端地址, 缓存交给引擎自管 (expo-image / FastImage) */
  const cacheWithSystemStrategy = useCallback(
    (src: ImageProps['src']) => {
      if (typeof src === 'string') {
        if (checkLocalError(src)) {
          recoveryToBgmCover()
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
        // 仅安卓: 登记内存命中记录, 供 preGetLocalCache 短路复用 (iOS 由 expo-image 自管, 不再登记)
        if (typeof uri === 'string' && !IOS) getLocalCache(uri)
        if (mountedRef.current) {
          setUri(uri)
        }
      }

      return true
    },
    [recoveryToBgmCover, setUri]
  )

  /**
   * 缓存图片: 统一走系统策略, 缓存交由引擎自管
   * - iOS: expo-image 内建磁盘 + 内存缓存 (cachePolicy)
   * - 安卓: FastImage 自带磁盘 + 内存缓存 (getLocalCache 仅登记内存命中记录, 供 preGetLocalCache 短路复用)
   * 旧 iOS 自研下载缓存 (image-cache-manager 竞速下载到本地 path) 已随 iOS 引擎迁移 expo-image 移除
   */
  const cache = useCallback(
    (src: ImageProps['src']) => cacheWithSystemStrategy(src),
    [cacheWithSystemStrategy]
  )

  /** 缓存图片 */
  const preCache = useCallback(async () => {
    await cache(propsRef.current.src)
  }, [cache])

  // ==================== 指数退避重试 ====================

  const scheduleRetry = useCallback(() => {
    const delay = getNextRetryDelay(retryAttemptRef.current)
    logger.warn(
      COMPONENT,
      'retry',
      propsRef.current.src,
      `attempt=${retryAttemptRef.current} delay=${delay}`
    )
    retryAttemptRef.current += 1

    pushTimer(
      setTimeout(() => {
        if (!mountedRef.current) return

        commitedRef.current = false
        errorCountRef.current = 0
        recoveriedRef.current = false
        fallbackedRef.current = false

        setState(s => ({ ...s, error: false, uri: undefined }))
        cacheRef.current?.(propsRef.current.src)
      }, delay)
    )
  }, [pushTimer])

  // 确定失败后: 通知外部并安排指数退避重试 (替代 componentDidUpdate)
  useEffect(() => {
    if (!state.error) return

    const { onError } = propsRef.current
    if (typeof onError === 'function') onError()

    scheduleRetry()
  }, [state.error, scheduleRetry])

  // ==================== 加载完成 ====================

  /** 图片加载结束（成功或失败都会触发） */
  const handleLoadEnd = useCallback(() => {
    if (!mountedRef.current) return

    // 已确定失败（commited=true 说明 onError 已触发）不重置退避计数
    if (!commitedRef.current) {
      retryAttemptRef.current = 0
    }

    setState(s => (s.loaded ? s : { ...s, loaded: true }))

    const { onLoadEnd, fadeDuration } = propsRef.current
    if (typeof onLoadEnd === 'function') onLoadEnd()

    if (IOS) return

    // 无动画: 直接完成
    if (fadeDuration === 0) {
      setState(s => (s.animFinished ? s : { ...s, animFinished: true }))
      return
    }

    // 有动画: 等动画结束后移除背景色
    pushTimer(
      setTimeout(() => {
        if (mountedRef.current) {
          setState(s => ({ ...s, animFinished: true }))
        }
      }, IMAGE_FADE_DURATION + 400)
    )
  }, [pushTimer])

  // ==================== 初始加载 & src 变化重新缓存 ====================
  // 替代 componentDidMount / UNSAFE_componentWillReceiveProps

  const initializedRef = useRef(false)
  const lastSrcRef = useRef<ImageProps['src']>(undefined)

  useEffect(() => {
    if (props.textOnly) return

    // 首次挂载
    if (!initializedRef.current) {
      initializedRef.current = true
      lastSrcRef.current = src

      // 不缓存 / WEB 环境: 直接用远端地址
      if (!props.cache || WEB) {
        setUri(fixedRemoteImageUrl(src))
        return
      }

      // 本地图片: 直接使用
      if (typeof src !== 'string') {
        setUri(src)
        return
      }

      // high 优先级立即加载, low 延迟 40ms
      if (priority === 'high') {
        if (preGetLocalCache()) return
        preCache()
        return
      }

      pushTimer(
        setTimeout(
          () => {
            if (preGetLocalCache()) return
            preCache()
          },
          priority === 'low' ? 40 : 0
        )
      )
      return
    }

    // src 变化
    if (lastSrcRef.current === src) return
    lastSrcRef.current = src

    // 重置失败状态, 避免换图继承上一张图的错误标记
    // 不清 uri 与 error: 旧图展示到新图就绪, 不打断进行中的退避链路
    // 已知边界: 挂起的退避定时器触发后会幂等重复 cache 新地址一次
    errorCountRef.current = 0
    fallbackedRef.current = false
    recoveriedRef.current = false
    commitedRef.current = false
    retryAttemptRef.current = 0
    setState(s => ({
      ...s,
      width: 0,
      height: 0,
      loaded: false,
      animFinished: false
    }))

    if (WEB) {
      setUri(fixedRemoteImageUrl(src))
      return
    }

    cache(src)
  }, [
    src,
    priority,
    props.cache,
    props.textOnly,
    pushTimer,
    setUri,
    preGetLocalCache,
    preCache,
    cache
  ])

  // 同步最新 cache 到 ref, 供 retry / scheduleRetry 调用
  useEffect(() => {
    cacheRef.current = cache
  })

  // ==================== 对外暴露 ====================

  /** 开发调试信息快照 */
  const getDebugInfo = useCallback(
    () => ({
      _size: sizeRef.current,
      _errorCount: errorCountRef.current,
      _fallbacked: fallbackedRef.current,
      _recoveried: recoveriedRef.current,
      _commited: commitedRef.current,
      _retryAttempt: retryAttemptRef.current
    }),
    []
  )

  return {
    uri: state.uri,
    width: state.width,
    height: state.height,
    loaded: state.loaded,
    animFinished: state.animFinished,
    error: state.error,

    /** 下载到本地的文件大小 (bytes), 渲染期快照 */
    getSize: () => sizeRef.current,

    /** 是否已回退到 fallbackSrc, 渲染期快照 */
    getFallbacked: () => fallbackedRef.current,

    /** 设置远程宽高 (useImageAutoSize 回写) */
    setSize: useCallback((width: number, height: number) => {
      setState(s => (s.width === width && s.height === height ? s : { ...s, width, height }))
    }, []),

    getDebugInfo,
    handleError,
    handleLoadEnd,
    commitError
  }
}
