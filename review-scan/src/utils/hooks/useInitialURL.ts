/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:52:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 06:38:56
 */
import { useState } from 'react'
import { Linking } from 'react-native'
import { TEXT_BADGES } from '@constants/text'
import useMount from './useMount'

export default function useInitialURL() {
  const [url, setUrl] = useState(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) console.info(TEXT_BADGES.plain, 'useInitialURL', initialUrl)

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl)
        setProcessing(false)
      }, 800)
    }

    getUrlAsync()
  })

  return {
    url,
    processing
  }
}
