/*
 * @Author: czy0729
 * @Date: 2024-03-10 16:53:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:44:13
 */
import { t } from '@utils/fetch'
import { AnyObject, MonoId, Navigation, Paths } from '@types'

export function getOnPress(charaId: MonoId, go: string, navigation: Navigation) {
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

    t('资金日志.跳转', {
      to,
      monoId: charaId
    })

    navigation.push(to, {
      monoId: `character/${charaId}`,
      ...params
    })
  }
}

export function insertNewlineBeforeSecondBracket(text: string) {
  if (text.length >= 40) return text

  let count = 0
  return text.replace(/「/g, match => {
    count++
    return count === 2 ? '\n「' : match
  })
}
