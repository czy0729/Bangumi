/*
 * @Author: czy0729
 * @Date: 2026-08-24 21:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 条目分享页面逻辑: 生成分享图 + 保存图片
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { feedback, getStorage, info, loading, setStorage } from '@utils'
import { useMount } from '@utils/hooks'
import { STORAGE_KEY } from './ds'
import { html } from './html'
import { SAVE_SUCCESS_TIP, saveBase64Image } from './utils'

import type { NavigationProps } from '@types'
import type { Params, WebViewMessage } from './types'

/** 条目分享页面逻辑 */
export function useWebViewSharePage(props: NavigationProps) {
  const { _subjectId, _type, _url, _cover, _title, _content, _detail } = (props.route?.params ||
    {}) as Params

  const [captured, setCaptured] = useState(false)
  const [dark, setDark] = useState(false)
  const hideLoadingRef = useRef<(() => void) | null>(null)
  const savedRef = useRef(false)
  const capturedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /** 关闭全局 loading */
  const hideLoading = useCallback(() => {
    if (hideLoadingRef.current) {
      hideLoadingRef.current()
      hideLoadingRef.current = null
    }
  }, [])

  /** 取消失效的截图回调 */
  const clearCapturedTimer = useCallback(() => {
    if (capturedTimerRef.current) {
      clearTimeout(capturedTimerRef.current)
      capturedTimerRef.current = null
    }
  }, [])

  useMount(() => {
    if (!hideLoadingRef.current) hideLoadingRef.current = loading('生成中...')

    getStorage<boolean>(STORAGE_KEY).then(value => {
      setDark(value || false)
    })

    return () => {
      clearCapturedTimer()
      hideLoading()
    }
  })

  /** 切换亮暗色 */
  const handleToggleTheme = useCallback(() => {
    clearCapturedTimer()

    if (!hideLoadingRef.current) {
      hideLoadingRef.current = loading('生成中...')
    }

    const value = !dark
    savedRef.current = false
    setCaptured(false)
    setDark(value)
    setStorage(STORAGE_KEY, value)
  }, [clearCapturedTimer, dark])

  /** 保存分享图 */
  const handleSave = useCallback((dataUrl: string) => {
    saveBase64Image(
      dataUrl,
      () => {
        savedRef.current = true
        info(SAVE_SUCCESS_TIP)
        feedback()
      },
      message => info(message)
    )
  }, [])

  /** 接收 WebView 截图消息 */
  const onMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const { type, data } = JSON.parse(event.nativeEvent.data) as WebViewMessage
        switch (type) {
          case 'captured':
            clearCapturedTimer()
            capturedTimerRef.current = setTimeout(() => {
              capturedTimerRef.current = null
              setCaptured(true)
              hideLoading()
            }, 400)
            break

          case 'base64':
            if (data?.dataUrl) {
              if (savedRef.current) {
                info(SAVE_SUCCESS_TIP)
                return
              }

              handleSave(data.dataUrl)
            }
            break

          default:
            break
        }
      } catch {}
    },
    [clearCapturedTimer, hideLoading, handleSave]
  )

  /** WebView HTML 数据源, 引用需稳定, 避免无关重渲染时重新加载 */
  const source = useMemo(
    () => ({
      html: html({ _type, _url, _cover, _title, _content, _detail }, dark)
    }),
    [_type, _url, _cover, _title, _content, _detail, dark]
  )

  /** 热图埋点参数 */
  const hm = [`share/subject/${_subjectId}`, 'Share'] as const

  return {
    /** 截图是否已生成 (生成前显示遮罩) */
    captured,

    /** 是否暗色模式 */
    dark,

    /** WebView HTML 数据源 */
    source,

    /** 热图埋点参数 */
    hm,

    /** WebView 消息回调 */
    onMessage,

    /** 切换亮暗色 */
    handleToggleTheme
  }
}
