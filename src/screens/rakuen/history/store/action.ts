/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:34:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-26 00:00:00
 */
import { info } from '@utils'
import { logger } from '@utils/dev'
import { gets } from '@utils/kv'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

import type { CollectRankSort, Types } from '../types'
import type { TopicId } from '@types'

export default class Action extends Fetch {
  /** 切换 Tab */
  onIndexChange = (page: number) => {
    this.setState({
      page
    })
    this.save()
  }

  /** 切换类型 */
  onValueChange = (title: Types) => {
    this.setState({
      type: title
    })
    this.save()
  }

  /** 加载一页云端帖子数据 */
  onPage = async (data: TopicId[]) => {
    if (!data.length) return true

    const keys = data.map(item => `favor_${item.replace('/', '_')}`)
    if (!keys.length) return true

    const datas = await gets(keys)
    this.setState({
      topics: datas
    })
    this.save()
  }

  /** 加载一页云端帖子数据 */
  onPageMemo = async (data: string[]) => {
    if (!data.length) return true

    const keys = data
      .map(item => `favor_${item.replace('/', '_')}`)
      .filter(key => !this.state.topics[key])
    if (!keys.length) return true

    const datas = await gets(keys)
    this.setState({
      topics: datas
    })
    this.save()
  }

  /** 翻页请求中, 避免并发拉取 */
  fetching = false

  /**
   * 拉取指定页
   * - 空页回到上一页, 避免页码越过末页
   * - 失败回滚页码; 连点中页码已前移时, 结束后补拉最新页
   */
  fetchPage = async (page: number, fromPage: number) => {
    if (this.fetching) return

    this.fetching = true
    /** 请求结束后需要补拉的页, 0 表示不补拉 */
    let next = 0
    try {
      const data = await this.fetchGroup(page)
      if (page > 1 && !data.list.length) {
        const target = page - 1
        info('没有更多了')
        this.setState({
          replyPage: target,
          ipt: String(target)
        })
        next = target
      }
    } catch (error) {
      logger.error(NAMESPACE, 'fetchPage', error)
      info('加载失败')

      const { replyPage } = this.state
      if (replyPage === page) {
        // 期间没有新的翻页意图, 回滚即完成
        this.setState({
          replyPage: fromPage,
          ipt: String(fromPage)
        })
      } else {
        // 连点中页码已前移, 补拉最新页
        next = replyPage
      }
    } finally {
      this.fetching = false
      this.save()
    }

    if (next && next !== page) this.fetchPage(next, page)
  }

  /** 上一页 */
  prev = () => {
    const { replyPage } = this.state
    if (replyPage <= 1) return

    const nextPage = replyPage - 1
    this.setState({
      replyPage: nextPage,
      ipt: String(nextPage)
    })
    this.save()
    this.fetchPage(nextPage, replyPage)
  }

  /** 下一页 */
  next = () => {
    const { replyPage } = this.state
    const nextPage = replyPage + 1

    this.setState({
      replyPage: nextPage,
      ipt: String(nextPage)
    })
    this.save()
    this.fetchPage(nextPage, replyPage)
  }

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 切换热门排序 */
  onCollectRankSortChange = (title: CollectRankSort) => {
    this.setState({
      collectRankSort: title
    })
    this.save()
  }

  /** 页码跳转 */
  doSearch = () => {
    const { ipt, replyPage } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (Number.isNaN(_ipt) || _ipt < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      replyPage: _ipt,
      ipt: String(_ipt)
    })
    this.save()
    this.fetchPage(_ipt, replyPage)
  }
}
