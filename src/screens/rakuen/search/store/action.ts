/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 页面动作: 输入 / 历史 / 搜索
 */
import { searchStore } from '@stores'
import { feedback, info, updateVisibleBottom } from '@utils'
import { ensureArrayLimit } from '@utils/cache'
import { t } from '@utils/fetch'
import { SORT_KEYS } from '../ds'
import Computed from './computed'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 历史记录上限 */
const HISTORY_MAX = 10

export default class Action extends Computed {
  /** 持久化 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  /** 输入框变化 */
  onChange = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  /** 选择历史 */
  selectHistory = (value: string) => {
    t('帖子搜索.选择历史', {
      value
    })

    this.setState({
      value
    })
    this.doSearch()
  }

  /** 删除历史 */
  deleteHistory = (value: string) => {
    t('帖子搜索.删除历史', {
      value
    })

    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 下一页请求中, 避免 onEndReached 连续触发 */
  fetchingPage = false

  /** 切换排序 */
  onSortChange = (title: string) => {
    const { sort, keyword } = this.state
    const next = SORT_KEYS[title]
    if (!next || next === sort) return

    this.setState({
      sort: next
    })
    this.save()

    // 用已提交的关键字重搜, 而不是输入框当前内容
    if (keyword) this.doSearch(keyword)
  }

  /** 加载下一页 */
  onFooterRefresh = () => {
    const { keyword, sort } = this.state
    const { _loaded, pagination } = this.search
    if (!_loaded || !keyword || this.fetchingPage) return

    const { page = 1, pageTotal = 1 } = pagination || {}
    // 没有更多时 footer 已显示 `没有更多了`, 不重复提示
    if (page >= pageTotal) return

    this.fetchingPage = true
    return searchStore.fetchRakuenSearch(keyword, page + 1, sort).finally(() => {
      this.fetchingPage = false
    })
  }

  /** 搜索, nextKeyword 用于排序切换等已有关键字的场景 */
  doSearch = async (nextKeyword?: string) => {
    const { history, value, sort } = this.state
    const keyword = (nextKeyword ?? value).trim()
    if (!keyword) {
      info('请输入内容')
      return
    }

    // 输入框重复触发时忽略; 显式指定关键字 (如切换排序) 允许发起
    if (!nextKeyword && this.state.searching) return

    t('帖子搜索.搜索', {
      value: keyword
    })

    const _history = [...history]
    if (!_history.includes(keyword)) _history.unshift(keyword)
    ensureArrayLimit(_history, HISTORY_MAX)

    this.setState({
      history: _history,
      keyword,
      searching: true,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()

    try {
      const data = await searchStore.fetchRakuenSearch(keyword, 1, sort)
      if (data === null) {
        info('搜索失败, 请稍候再试')
        return
      }

      feedback(true)
      if (!data.length) info('没有查询到结果, 也有可能是搜索服务失效了')
    } catch (ex) {
      info('请稍候再查询')
    } finally {
      this.setState({
        searching: false
      })
    }
  }
}
