/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面业务动作: 翻页 / 加入退出 / 本地化
 */
import { getHeaderFixed } from '@components/header-v2/utils'
import { rakuenStore, userStore } from '@stores'
import { feedback, info } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { webhookGroup } from '@utils/webhooks'
import { HOST } from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollEvent, TopicId } from '@types'

export default class Action extends Fetch {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.key, EXCLUDE_STATE)
  }

  /** 滑动回调 */
  onScroll = (e: ScrollEvent) => {
    const { y } = e.nativeEvent.contentOffset

    // 计算头部是否需要固定
    const fixed = getHeaderFixed(y, this.state.fixed)
    if (fixed === null) return

    this.setState({
      fixed
    })
  }

  /** 上一页 */
  prev = async () => {
    const { page } = this.state
    if (page === 1) return

    t('小组.上一页', {
      page: page - 1,
      groupId: this.groupId
    })

    this.setState({
      page: page - 1,
      ipt: String(page - 1)
    })
    await this.fetchGroup()
    this.save()
  }

  /** 下一页 */
  next = async () => {
    const { page } = this.state
    t('小组.下一页', {
      page: page + 1,
      groupId: this.groupId
    })

    this.setState({
      page: page + 1,
      ipt: String(page + 1)
    })
    await this.fetchGroup()
    this.save()
  }

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: number) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  /** 切换时间格式 */
  onToggleShowLastDate = () => {
    const value = !this.state.showLastDate
    this.setState({
      showLastDate: value
    })
    this.save()
  }

  /** 页码跳转 */
  doSearch = async () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('小组.页码跳转', {
      page: _ipt,
      groupId: this.groupId
    })

    this.setState({
      page: _ipt,
      ipt: String(_ipt)
    })
    await this.fetchGroup()
    this.save()
  }

  /** 加入小组 */
  doJoin = async () => {
    const { joinUrl } = this.groupInfo
    if (!joinUrl) return false

    t('小组.加入', {
      groupId: this.groupId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`,
      data: {
        action: 'join-bye'
      }
    })
    feedback()
    info('已加入小组')
    webhookGroup(
      {
        ...this.groupInfo,
        id: this.groupId
      },
      userStore.userInfo
    )

    return this.fetchGroupInfo()
  }

  /** 退出小组 */
  doBye = async () => {
    const { byeUrl } = this.groupInfo
    if (!byeUrl) return false

    t('小组.退出', {
      groupId: this.groupId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`,
      data: {
        action: 'join-bye'
      }
    })
    feedback()
    info('已退出小组')

    return this.fetchGroupInfo()
  }
}
