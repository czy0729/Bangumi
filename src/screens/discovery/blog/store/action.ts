/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 03:54:22
 */
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
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

  /** 上一页 */
  prev = () => {
    const { currentPage, ipt } = this.state
    const page = currentPage[this.type]
    if (currentPage[this.type] === 1) return

    t('全站日志.上一页', {
      type: this.type,
      page: page - 1
    })

    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [this.type]: page - 1
      },
      ipt: {
        ...ipt,
        [this.type]: String(page - 1)
      }
    })
    this.fetchBlog()
    this.onShow()
  }

  /** 下一页 */
  next = () => {
    const { currentPage, ipt } = this.state
    const page = currentPage[this.type]
    t('全站日志.下一页', {
      type: this.type,
      page: page + 1
    })

    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [this.type]: page + 1
      },
      ipt: {
        ...ipt,
        [this.type]: String(page + 1)
      }
    })
    this.fetchBlog()
    this.onShow()
  }

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }) => {
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
    const { currentPage, ipt } = this.state
    const _ipt = ipt[this.type] === '' ? 1 : parseInt(ipt[this.type])
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('全站日志.页码跳转', {
      type: this.type,
      page: _ipt
    })

    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [this.type]: _ipt
      },
      ipt: {
        ...ipt,
        [this.type]: String(_ipt)
      }
    })
    this.fetchBlog()
    this.onShow()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
