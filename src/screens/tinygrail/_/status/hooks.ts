/*
 * @Author: czy0729
 * @Date: 2026-06-16 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-16 10:00:00
 */
import { useCallback } from 'react'
import { tinygrailStore } from '@stores'
import { confirm, info } from '@utils'
import {
  LABEL_CANCEL_ASK,
  LABEL_CANCEL_AUCTION,
  LABEL_CANCEL_BID,
  MSG_CONFIRM_FEE,
  MSG_FAIL
} from './ds'

import type { Id } from '@types'

/** 判断今天是否周六 */
function isSaturday() {
  return new Date().getDay() === 6
}

export function useStatus(id: Id) {
  const biding = tinygrailStore.bidMap[id] !== undefined
  const asksing = tinygrailStore.asksMap[id] !== undefined
  const auctioning = tinygrailStore.auctionMap[id] !== undefined

  /** 构建菜单项 */
  const data: string[] = []

  if (biding) {
    const index = tinygrailStore.bidMap[id]
    const item = tinygrailStore.bid.list[index]
    if (item) {
      data.push(`${LABEL_CANCEL_BID} (${item.state}股 ₵${item.current})`)
    } else {
      data.push(LABEL_CANCEL_BID)
    }
  }

  if (asksing) {
    const index = tinygrailStore.asksMap[id]
    const item = tinygrailStore.asks.list[index]
    if (item) {
      data.push(`${LABEL_CANCEL_ASK} (${item.state}股 ₵${item.current})`)
    } else {
      data.push(LABEL_CANCEL_ASK)
    }
  }

  let auctionItemId: Id = 0
  if (auctioning) {
    const index = tinygrailStore.auctionMap[id]
    const item = tinygrailStore.auction.list[index]
    if (item) {
      auctionItemId = item.id
      data.push(`${LABEL_CANCEL_AUCTION} (${item.amount}股 ₵${item.price})`)
    } else {
      data.push(LABEL_CANCEL_AUCTION)
    }
  }

  /** 处理菜单选择 */
  const handleSelect = useCallback(
    async (title: string) => {
      try {
        if (title.includes(LABEL_CANCEL_BID)) {
          const logs = await tinygrailStore.fetchUserLogs(id)
          if (logs?.bids?.length) {
            let success = true
            for (const bid of logs.bids) {
              const result = await tinygrailStore.doCancelBid({ id: bid.id })
              if (!result) success = false
            }
            info(success ? `${LABEL_CANCEL_BID}成功` : `${LABEL_CANCEL_BID}失败`)
            tinygrailStore.fetchBid()
            tinygrailStore.fetchUserLogs(id)
          }
        } else if (title.includes(LABEL_CANCEL_ASK)) {
          const logs = await tinygrailStore.fetchUserLogs(id)
          if (logs?.asks?.length) {
            let success = true
            for (const ask of logs.asks) {
              const result = await tinygrailStore.doCancelAsk({ id: ask.id })
              if (!result) success = false
            }
            info(success ? `${LABEL_CANCEL_ASK}成功` : `${LABEL_CANCEL_ASK}失败`)
            tinygrailStore.fetchAsks()
            tinygrailStore.fetchUserLogs(id)
          }
        } else if (title.includes(LABEL_CANCEL_AUCTION)) {
          const doCancel = async () => {
            const data = await tinygrailStore.doAuctionCancel({ id: auctionItemId })
            if (data?.State === 0) {
              info(`${LABEL_CANCEL_AUCTION}成功`)
              tinygrailStore.fetchAuction()
            } else {
              info(`${LABEL_CANCEL_AUCTION}失败`)
            }
          }

          if (isSaturday()) {
            confirm(MSG_CONFIRM_FEE, doCancel)
          } else {
            await doCancel()
          }
        }
      } catch (error) {
        info(MSG_FAIL)
      }
    },
    [id, auctionItemId]
  )

  return {
    biding,
    asksing,
    auctioning,
    data,
    handleSelect
  }
}
