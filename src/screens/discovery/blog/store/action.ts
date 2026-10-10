/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 日志操作: 标签页切换 / 翻页
 */
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollToOffset } from '@components'

export default class Action extends Fetch {
  scrollToOffset: ScrollToOffset = null

  /** 列表滚动方法 (forwardRef) */
  forwardRef = (ref: { scrollToOffset: ScrollToOffset }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

  /** 标签页切换 */
  onTabChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.save()
    this.tabChangeCallback(page)

    t('全站日志.标签页切换')
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    if (!this.blog(TABS[page].key)._loaded) this.fetchBlog()
  }

  /** 切换列表显示，强制滑动到顶 */
  onShow = () => {
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)
  }

  /** 跳转页码, 重置滚动位置并制造切页效果 */
  private setPage = (page: number) => {
    const { currentPage, ipt } = this.state
    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [this.type]: page
      },
      ipt: {
        ...ipt,
        [this.type]: String(page)
      }
    })
    this.fetchBlog()
    this.onShow()

    // 列表跟随数据替换不重建, 需主动回到顶部
    setTimeout(() => {
      if (typeof this.scrollToOffset === 'function') {
        this.scrollToOffset({ offset: 0, animated: false })
      }
    }, 0)
  }

  /** 上一页 */
  prev = () => {
    const page = this.state.currentPage[this.type]
    // 非法页值 (NaN / undefined / 0) 一并拦下
    if (!(page > 1)) return

    t('全站日志.上一页', {
      type: this.type,
      page: page - 1
    })

    this.setPage(page - 1)
  }

  /** 下一页 */
  next = () => {
    const page = this.state.currentPage[this.type] + 1

    t('全站日志.下一页', {
      type: this.type,
      page
    })

    this.setPage(page)
  }

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const { text } = nativeEvent
    const { ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [this.type]: text
      }
    })
  }

  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const page = ipt[this.type] === '' ? 1 : parseInt(ipt[this.type])
    if (Number.isNaN(page) || page < 1) {
      info('请输入正确页码')
      return
    }

    t('全站日志.页码跳转', {
      type: this.type,
      page
    })

    this.setPage(page)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
