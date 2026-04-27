/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:14:05
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_NEWS } from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { Id } from '@types'

export default class Action extends Fetch {
  /** 更新页码并刷新列表 */
  private updatePage = (
    page: number,
    eventName: 'Anitama.上一页' | 'Anitama.下一页' | 'Anitama.页码跳转'
  ) => {
    this.setState({
      page,
      ipt: String(page)
    })
    this.prevPage = page
    this.fetchList()
    this.resetScrollView()

    t(eventName, { page })
  }

  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })

    setTimeout(() => {
      this.setState({
        show: true
      })

      this.save()
    }, 400)
  }

  /** 前一页 */
  prev = () => {
    const { page } = this.state
    if (page <= 1) return

    this.updatePage(page - 1, 'Anitama.上一页')
  }

  /** 下一页 */
  next = () => {
    this.updatePage(this.state.page + 1, 'Anitama.下一页')
  }

  /** 切换站点 */
  toggleType = (label: string) => {
    this.setState({
      type: MODEL_NEWS.getValue(label),
      ...EXCLUDE_STATE
    })
    this.save()
    this.fetchList()
    this.resetScrollView()

    t('Anitama.切换站点', {
      label
    })
  }

  /** 分页输入框改变 */
  onChange = ({ nativeEvent }) => {
    this.setState({
      ipt: nativeEvent.text
    })
  }

  /** 记录文章已看过 */
  pushHistory = (aid: Id) => {
    const { history } = this.state
    if (!history.includes(aid)) {
      this.setState({
        history: [...history, aid]
      })
      this.save()
    }
  }

  /** 切换是否使用内置浏览器打开网页 */
  toggleUseWebView = () => {
    const value = !this.state.useWebView
    this.setState({
      useWebView: value
    })
    this.save()

    info(`使用${value ? '内置' : '外部'}浏览器打开`)
    feedback(true)

    t('Anitama.内置浏览器', {
      value
    })
  }

  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const value = ipt === '' ? 1 : parseInt(ipt)
    if (value < 1 || isNaN(value)) {
      info('请输入正确页码')
      return
    }

    this.updatePage(value, 'Anitama.页码跳转')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
