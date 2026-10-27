/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 页面业务动作: 翻页 / 加入退出 / 本地化
 */
import { getHeaderFixed } from '@components/header-v2/utils'
import { rakuenStore, userStore } from '@stores'
import { feedback, info } from '@utils'
import { logger } from '@utils/dev'
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

  /** 翻页请求中, 避免并发拉取 */
  fetching = false

  /**
   * 拉取指定页
   * - 失败回滚到请求前的页, 避免页码与内容错位
   * - 请求期间页码又被改动时, 结束后补拉最后一页
   * - 返回 busy (请求中) / fail (失败或已回滚) / ok (成功)
   */
  fetchPage = async (
    page: number,
    fromPage: number
  ): Promise<'busy' | 'fail' | 'ok'> => {
    if (this.fetching) return 'busy'

    this.fetching = true
    let failed = false
    let rollback = false
    try {
      await this.fetchGroup(page)
    } catch (error) {
      failed = true
      logger.error('group', 'fetchPage', error)
      info('加载失败')

      if (this.state.page === page) {
        rollback = true
        this.setState({
          page: fromPage,
          ipt: String(fromPage)
        })
      }
    } finally {
      this.fetching = false
      this.save()
    }

    // 已回滚到原页, 再补拉会重复请求并二次报错
    if (rollback) return 'fail'

    // 连点时只补拉最后一次页码, 结果以补拉为准
    const { page: current } = this.state
    if (current !== page) return this.fetchPage(current, page)

    return failed ? 'fail' : 'ok'
  }

  /** 上一页 */
  prev = () => {
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
    this.save()
    this.fetchPage(page - 1, page)
  }

  /** 下一页 */
  next = () => {
    const { page } = this.state
    t('小组.下一页', {
      page: page + 1,
      groupId: this.groupId
    })

    this.setState({
      page: page + 1,
      ipt: String(page + 1)
    })
    this.save()
    this.fetchPage(page + 1, page)
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
  doSearch = () => {
    const { ipt, page } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (Number.isNaN(_ipt) || _ipt < 1) {
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
    this.save()
    this.fetchPage(_ipt, page)
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
