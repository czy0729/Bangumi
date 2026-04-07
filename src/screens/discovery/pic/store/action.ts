/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 20:16:19
 */
import { systemStore, userStore } from '@stores'
import { feedback, info, queue, updateVisibleBottom } from '@utils'
import i18n from '@constants/i18n'
import { TEXT_FETCHING_WAIT, TEXT_USER_LIMIT } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
  getList = (forceRefresh: boolean = false) => {
    return queue([() => this.fetchList(forceRefresh), () => this.fetchSrcs()], 1)
  }

  onPage = (page: number) => {
    feedback(true)

    if (page >= 3 && !systemStore.advance) {
      info(TEXT_USER_LIMIT)
      return
    }

    if (this.state.fetching) {
      info(TEXT_FETCHING_WAIT)
      return
    }

    this.setState({
      show: false,
      page
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 80)

    return this.getList()
  }

  onFilter = (label: string) => {
    let filter = (label.split(' (')?.[0] || '').trim()
    if (filter === '全部') filter = ''
    this.setState({
      filter
    })
    feedback(true)
  }

  onToggleFavor = async () => {
    const { name } = this.params
    if (!name) return

    if (!userStore.myUserId) {
      info(`收藏需要先${i18n.login()}`)
      return
    }

    // const key = `pic_favor_${userStore.myUserId}` as const
    // const value = await get(key)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
