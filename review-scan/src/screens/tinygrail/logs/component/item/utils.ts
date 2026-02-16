/*
 * @Author: czy0729
 * @Date: 2024-03-10 16:53:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-02 16:13:23
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

export function calculatePricePerShare(desc: string, price: number): string {
  if (!desc.includes('成交')) return ''

  // 匹配"X股"格式的数字，例如"46股"
  const shareMatch = desc.match(/(\d+)股/)

  // 未找到股数信息
  if (!shareMatch?.[1]) return ''

  const shares = parseInt(shareMatch[1], 10)

  // 股数必须大于0
  if (shares <= 0) return null

  // 计算单价并保留2位小数
  const pricePerShare = price / shares
  return `成交均价 ₵${pricePerShare.toFixed(2)}`
}
