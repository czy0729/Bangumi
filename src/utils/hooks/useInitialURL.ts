/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:52:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:14:37
 */
import { useState } from 'react'
import { Linking } from 'react-native'
import { logger } from '../dev'
import useMount from './useMount'

const TAG = '@utils/hooks/useInitialURL'

/**
 * 自定义 Hook，用于获取启动 APP 的初始 deep link 地址
 *
 * @returns url 为初始链接 (无则 `null`), processing 为是否仍在解析中
 */
export default function useInitialURL() {
  const [url, setUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) logger.log(TAG, 'getUrlAsync', { initialUrl })

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl)
        setProcessing(false)
      }, 800)
    }

    getUrlAsync()
  })

  return {
    /** 启动 APP 的初始 deep link 地址, 无则为 `null` */
    url,

    /** 是否仍在解析中 */
    processing
  }
}
