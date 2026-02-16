/*
 * @Author: czy0729
 * @Date: 2025-01-14 16:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:46:54
 */
import { tinygrailStore } from '@stores'
import { t } from '@utils/fetch'
import { feedback, info } from '@utils/ui'
import { throttleInfo } from '@tinygrail/_/utils'
import { Id } from '@types'
import { TABS } from '../ds'
import { Direction } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page,
      sort: '',
      direction: ''
    })
    this.tabChangeCallback(page)

    t('我的委托.标签页切换', {
      page
    })
  }

  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    if (!this.list(key)._loaded) this.fetchList(key)
  }

  onLevelSelect = (level: any) => {
    this.setState({
      level
    })
  }

  onSortPress = (item: string) => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection: Direction = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      t('我的委托.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('我的委托.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }
  }

  onBatchCancel = () => {
    if (this.currentKey === 'asks' || this.currentKey === 'bid') {
      this.doCancelAllBid()
    } else {
      this.doCancelAllAuction()
    }
  }

  // -------------------- action --------------------
  doAuctionCancel = async (id: Id) => {
    if (!id) return

    t('我的委托.取消拍卖', {
      id
    })

    const result = await tinygrailStore.doAuctionCancel({
      id
    })
    feedback()

    if (!result) {
      info('取消失败')
      return
    }

    info('已取消')
    this.fetchList()
  }

  doCancelAllBid = async () => {
    const { list } = this.computedList(this.currentKey)
    t('我的委托.一键取消', {
      length: list.length
    })

    for (const item of list) {
      throttleInfo(`${list.findIndex((i: { id: any }) => item.id === i.id) + 1} / ${list.length}`)

      // 请求角色挂单信息
      const logs = await tinygrailStore.fetchUserLogs(item.id)
      if (this.currentKey === 'asks') {
        // 取消卖单
        for (const ask of logs.asks) {
          await tinygrailStore.doCancelAsk({
            id: ask.id
          })
        }
      } else if (this.currentKey === 'bid') {
        // 取消买单
        for (const bid of logs.bids) {
          await tinygrailStore.doCancelBid({
            id: bid.id
          })
        }
      }
    }
    feedback()

    await this.fetchList(this.currentKey)
    info('操作完成')
  }

  doCancelAllAuction = async () => {
    const list = this.computedList(this.currentKey).list.filter(item => item.state === 0)
    t('我的委托.一键取消', {
      length: list.length
    })

    for (const item of list) {
      throttleInfo(`${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`)
      await tinygrailStore.doAuctionCancel({
        id: item.id
      })
    }
    feedback()

    await this.fetchList(this.currentKey)
    info('操作完成')
  }
}
