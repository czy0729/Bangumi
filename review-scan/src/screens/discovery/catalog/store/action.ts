/*
 * @Author: czy0729
 * @Date: 2024-07-29 14:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 20:20:37
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_PAGINATION, TEXT_MENU_TOOLBAR } from '@constants'
import { TypeLabel } from '../types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 显示列表 */
  onShow = () => {
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)
  }

  /** 切换类型 */
  onToggleType = async (label: TypeLabel) => {
    if (label) {
      const { type } = this.state
      if (label === '最新' && type === '') return
      if (label === '热门' && type === 'collect') return
      if (label === '整合' && type === 'advance') return
    }

    this.setState({
      type: label === '热门' ? 'collect' : label === '整合' ? 'advance' : '',
      page: 1,
      ipt: '1',
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })

    await this.fetchCatalog()
    this.setState({
      show: true
    })
    this.save()

    t('目录.切换类型', {
      type: label
    })
  }

  /** 上一页 */
  onPrev = async () => {
    const { page } = this.state
    if (page === 1) return

    const value = page - 1
    this.setState({
      page: value,
      show: false,
      ipt: String(value),
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.fetchCatalog()
    this.onShow()

    t('目录.上一页', {
      page: value
    })
  }

  /** 下一页 */
  onNext = async () => {
    const { page } = this.state
    const value = page + 1
    this.setState({
      page: value,
      show: false,
      ipt: String(value),
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.fetchCatalog()
    this.onShow()

    t('目录.下一页', {
      page: value
    })
  }

  /** 页码输入框变化 */
  onChange = ({ nativeEvent }) => {
    this.setState({
      ipt: nativeEvent.text
    })
  }

  /** 高级筛选 */
  onFilterChange = (key: string, value: string | number) => {
    this.setState({
      page: 1,
      show: false,
      ipt: '1',
      [key]: value,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.onShow()
    this.fetchCatalog()

    t('目录.高级筛选', {
      value: `${key}|${value}`
    })
  }

  /** 切换锁定 */
  onToggleFixed = (key: string) => {
    const value = !this.state[key]
    this.setState({
      [key]: value
    })
    this.save()

    if (key === 'fixedFilter') {
      info(this.toolBar?.[0])
      feedback(true)
    } else if (key === 'fixedPagination') {
      info(this.toolBar?.[1])
      feedback(true)
    }

    t('目录.切换锁定', {
      value: `${key}|${value}`
    })
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleFixed('fixedFilter')
    if (title.includes(TEXT_MENU_PAGINATION)) return this.onToggleFixed('fixedPagination')
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
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
      show: false,
      ipt: String(value),
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)

    t('目录.页码跳转', {
      page: value
    })
  }
}
