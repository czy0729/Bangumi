/*
 * @Author: czy0729
 * @Date: 2020-09-11 14:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-12 22:31:46
 */
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { useInitialURL } from '@utils/hooks'
import { navigationReference, appNavigate } from '@utils/app'

let bind = false
function navigate(url) {
  if (url) {
    const navigation = navigationReference()
    appNavigate(
      url,
      navigation,
      {},
      {
        id: '其他.Linking'
      },
      false
    )
  }
}

function DeepLink() {
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
