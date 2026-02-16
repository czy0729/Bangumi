/*
 * @Author: czy0729
 * @Date: 2020-09-11 14:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:27:52
 */
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { r } from '@utils/dev'
import { useInitialURL } from '@utils/hooks'
import { navigate } from './utils'
import { COMPONENT } from './ds'

let bind = false

/** 系统外部链接 */
export const DeepLink = () => {
  r(COMPONENT)

  const { url: initialUrl } = useInitialURL()
  useEffect(() => {
    if (!bind) {
      Linking.addEventListener('url', ({ url }) => navigate(url))
      bind = true
    }
    navigate(initialUrl)

    return () => {}
  }, [initialUrl])

  return null
}

export default DeepLink
