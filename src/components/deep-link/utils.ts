/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:45:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 13:45:49
 */
import { navigationReference, appNavigate } from '@utils'

export function navigate(url: string) {
  if (url) {
    const navigation = navigationReference()
    appNavigate(
      url,
      navigation,
      {},
      {
        id: '其他.Linking',
        data: undefined
      },
      false
    )
  }
}
