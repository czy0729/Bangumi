/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:45:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 21:18:32
 */
import { appNavigate, navigationReference } from '@utils'

const NAVIGATION_RETRY_DELAY = 2000
const MAX_RETRIES = 3

export function navigate(url: string) {
  if (!url) return

  const callback = (navigationRef: any) => {
    appNavigate(
      url,
      navigationRef,
      {},
      {
        id: '其他.Linking',
        data: undefined
      },
      false
    )
  }

  const attemptNavigation = (retryCount = 0) => {
    const navigation = navigationReference()

    if (navigation) {
      callback(navigation)
    } else if (retryCount < MAX_RETRIES) {
      setTimeout(() => attemptNavigation(retryCount + 1), NAVIGATION_RETRY_DELAY)
    }
  }

  attemptNavigation()
}
