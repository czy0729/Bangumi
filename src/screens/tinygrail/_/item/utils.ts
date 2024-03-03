/*
 * @Author: czy0729
 * @Date: 2022-11-07 16:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 16:55:37
 */
import { t } from '@utils/fetch'
import { AnyObject, EventKeys, MonoId, Navigation, Paths } from '@types'

/** 路由跳转复写 */
export function getOnPress(
  charaId: MonoId,
  go: string,
  navigation: Navigation,
  eventId?: EventKeys,
  eventData?: AnyObject
) {
  return () => {
    let to: Paths
    let params: AnyObject
    switch (go) {
      case 'K线':
        to = 'TinygrailTrade'
        break

      case '买入':
        to = 'TinygrailDeal'
        params = {
          type: 'bid'
        }
        break

      case '卖出':
        to = 'TinygrailDeal'
        params = {
          type: 'asks'
        }
        break

      case '资产重组':
        to = 'TinygrailSacrifice'
        break

      default:
        return
    }

    if (eventId) {
      t(eventId, {
        to,
        monoId: charaId,
        ...eventData
      })
    }

    navigation.push(to, {
      monoId: `character/${charaId}`,
      ...params
    })
  }
}
