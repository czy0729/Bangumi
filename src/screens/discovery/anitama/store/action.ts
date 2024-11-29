/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:14:05
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_NEWS } from '@constants'
import { Id } from '@types'
import Fetch from './fetch'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

let prevPage: number

export default class Action extends Fetch {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      show: true,
      _loaded: true
    })

    // 首次启动使用页码 1, 再次进入页面使用之前的页码
    if (!prevPage) {
      prevPage = this.state.page
    } else {
      this.setState({
        page: Number(prevPage),
        ipt: String(prevPage)
      })
    }

    this.fetchList()
    return true
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
    if (page == 1) return

    const value = parseInt(String(page)) - 1
    this.setState({
      page: value,
      ipt: String(value)
    })
    prevPage = value
    this.fetchList()
    this.resetScrollView()

    t('Anitama.上一页', {
      page: value
    })
  }

  /** 下一页 */
  next = () => {
    const { page } = this.state
    const value = parseInt(String(page)) + 1
    this.setState({
      page: value,
      ipt: String(value)
    })
    prevPage = value
    this.fetchList()
    this.resetScrollView()

    t('Anitama.下一页', {
      page: value
    })
  }

  /** 切换站点 */
  toggleType = (label: string) => {
    this.setState({
      type: MODEL_NEWS.getValue(label),
      ...EXCLUDE_STATE
    })
    this.save()
    this.fetchList()

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

    if (value) {
      info('使用内置浏览器打开')
    } else {
      info('使用外部浏览器打开')
    }
    feedback(true)

    t('Anitama.内置浏览器', {
      value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const value = ipt === '' ? 1 : parseInt(ipt)
    if (value < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      page: value,
      ipt: String(value)
    })
    prevPage = value
    this.fetchList()
    this.resetScrollView()

    t('Anitama.页码跳转', {
      page: value
    })
  }
}
