/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:52:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:29:56
 */
import { useState } from 'react'
import { Linking } from 'react-native'
import { logger } from '../dev'
import useMount from './useMount'

const TAG = '@utils/hooks/useInitialURL'

export default function useInitialURL() {
  const [url, setUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) logger.log(TAG, { initialUrl })

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
