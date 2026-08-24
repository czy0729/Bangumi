/*
 * @Author: czy0729
 * @Date: 2026-08-24 21:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 22:15:00
 */
import { useCallback, useRef, useState } from 'react'
import { feedback, getStorage, info, loading, setStorage } from '@utils'
import { useMount } from '@utils/hooks'
import { IOS } from '@constants'
import { html } from './html'
import { saveBase64ImageToCameraRoll, saveBase64ImageToShareSheet } from './utils'

import type { NavigationProps } from '@types'
import type { Params, WebViewMessage } from './types'

const NAMESPACE = 'ScreenWebViewShare'

/** 条目分享页面逻辑 */
export function useWebViewSharePage(props: NavigationProps) {
  const { _subjectId, _type, _url, _cover, _title, _content, _detail } = (props.route?.params ||
    {}) as Params

  const [captured, setCaptured] = useState(false)
  const [dark, setDark] = useState(false)
  const hideLoadingRef = useRef<(() => void) | null>(null)
  const savedRef = useRef(false)

  /** 关闭全局 loading */
  const hideLoading = useCallback(() => {
    if (hideLoadingRef.current) {
      hideLoadingRef.current()
      hideLoadingRef.current = null
    }
  }, [])

  useMount(() => {
    getStorage<boolean>(`${NAMESPACE}|dark`).then(value => {
      setDark(value || false)

      if (!hideLoadingRef.current) {
        hideLoadingRef.current = loading('生成中...')
      }
    })
  })

  /** 切换亮暗色 */
  const handleToggleTheme = useCallback(() => {
    if (!hideLoadingRef.current) {
      hideLoadingRef.current = loading('生成中...')
    }

    const value = !dark
    setCaptured(false)
    setDark(value)
    setStorage(`${NAMESPACE}|dark`, value)
  }, [dark])

  /** iOS: 打开系统分享面板保存 */
  const handleSaveToShareSheet = useCallback((dataUrl: string) => {
    saveBase64ImageToShareSheet(
      dataUrl,
      () => {
        savedRef.current = true
        info('已保存')
        feedback()
      },
      () => info('保存失败，请重试')
    )
  }, [])

  /** Android: 保存到系统相册 */
  const handleSaveToCameraRoll = useCallback((dataUrl: string) => {
    saveBase64ImageToCameraRoll(
      dataUrl,
      () => {
        savedRef.current = true
        info('已保存到相册')
        feedback()
      },
      () => info('保存失败, 请确保给与读写权限')
    )
  }, [])

  /** 接收 WebView 截图消息 */
  const onMessage = useCallback(
    async (event: { nativeEvent: { data: string } }) => {
      try {
        const { type, data } = JSON.parse(event.nativeEvent.data) as WebViewMessage
        switch (type) {
          case 'captured':
            setTimeout(() => {
              setCaptured(true)
              hideLoading()
            }, 400)
            break

          case 'base64':
            if (data?.dataUrl) {
              if (savedRef.current) {
                info(IOS ? '已保存' : '已保存到相册')
                return
              }

              if (IOS) {
                handleSaveToShareSheet(data.dataUrl)
              } else {
                handleSaveToCameraRoll(data.dataUrl)
              }
            }
            break

          default:
            break
        }
      } catch {}
    },
    [hideLoading, handleSaveToCameraRoll, handleSaveToShareSheet]
  )

  return {
    /** 截图是否已生成 (生成前显示遮罩) */
    captured,

    /** 是否暗色模式 */
    dark,

    /** WebView HTML 数据源 */
    source: {
      html: html(dark, _type)
        .replace(/\$url/g, _url)
        .replace(/\$cover/g, _cover)
        .replace(/\$title/g, _title)
        .replace(/\$content/g, _content)
        .replace(/\$detail/g, _detail)
    },

    /** 热图埋点参数 */
    hm: [`share/subject/${_subjectId}`, 'Share'] as [string, string],

    /** WebView 消息回调 */
    onMessage,

    /** 切换亮暗色 */
    handleToggleTheme
  }
}
