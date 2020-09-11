/*
 * @Author: czy0729
 * @Date: 2020-09-11 14:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-11 16:34:58
 */
import { useEffect } from 'react'
import { useInitialURL } from '@utils/hooks'
import { navigationReference, appNavigate } from '@utils/app'

function DeepLink() {
  const { url: initialUrl } = useInitialURL()
  useEffect(() => {
    const navigation = navigationReference()
    appNavigate(
      initialUrl,
      navigation,
      {},
      {
        id: '其他.Linking'
      },
      false
    )
    return () => {}
  }, [initialUrl])

  return null
}

export default DeepLink
