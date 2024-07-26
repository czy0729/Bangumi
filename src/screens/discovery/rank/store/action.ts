/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:14:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 05:04:51
 */
import { ScrollTo } from '@components'
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType, SubjectTypeCn } from '@types'
import { ToolBarKeys } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  scrollTo: ScrollTo

  forwardRef = (scrollTo: ScrollTo) => {
    if (scrollTo) this.scrollTo = scrollTo
  }

  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = async (refresh?: boolean) => {
    this.save()

    if (refresh) {
      if (!this.rank._loaded) {
        await this.fetchRank()
      } else {
        this.fetchRank()
      }
    }

    setTimeout(() => {
      if (typeof this.scrollTo === 'function') {
        this.scrollTo({
          x: 0,
          y: 0,
          animated: false
        })
      }
    }, 0)
  }

  /** 类型选择 */
  onTypeSelect = (type: SubjectTypeCn) => {
    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(type),
      filter: ''
    })
    this.resetScrollView(true)

    t('排行榜.类型选择', {
      type
    })
  }

  /** 筛选选择 */
  onFilterSelect = (filter: string, filterData: { getValue: (arg0: any) => any }) => {
    this.setState({
      filter: filter === '全部' ? '' : filterData.getValue(filter)
    })
    this.resetScrollView(true)

    t('排行榜.筛选选择', {
      filter
    })
  }

  /** 年选择 */
  onAirdateSelect = (airtime: string) => {
    const { type, currentPage, ipt } = this.state
    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: '',
      currentPage: {
        ...currentPage,
        [type]: 1
      },
      ipt: {
        ...ipt,
        [type]: '1'
      }
    })
    this.resetScrollView(true)

    t('排行榜.年选择', {
      airtime
    })
  }

  /** 月选择 */
  onMonthSelect = (month: string) => {
    const { airtime, type, currentPage, ipt } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    this.setState({
      month: month === '全部' ? '' : month,
      currentPage: {
        ...currentPage,
        [type]: 1
      },
      ipt: {
        ...ipt,
        [type]: '1'
      }
    })
    this.resetScrollView(true)

    t('排行榜.月选择', {
      month
    })
  }

  /** 切换布局 */
  onToggleList = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.resetScrollView()

    t('排行榜.切换布局', {
      list: value
    })
  }

  /** 工具栏 */
  onToggleToolbar = (key: ToolBarKeys) => {
    const value = !this.state[key]
    this.setState({
      [key]: value
    })
    this.save()

    t('排行榜.工具栏', {
      [key]: value
    })
  }

  /** 上一页 */
  onPrev = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]
    if (currentPage[type] === 1) return

    const value = page - 1
    this.setState({
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.resetScrollView(true)

    t('排行榜.上一页', {
      type,
      page: value
    })
  }

  /** 下一页 */
  onNext = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]

    const value = page + 1
    this.setState({
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.resetScrollView(true)

    t('排行榜.下一页', {
      type,
      page: value
    })
  }

  /** 输入框改变 */
  onChange = ({ nativeEvent }) => {
    const { type, ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [type]: nativeEvent.text
      }
    })
  }

  /** 页码跳转 */
  doSearch = () => {
    const { type, currentPage, ipt } = this.state
    const value = ipt[type] === '' ? 1 : parseInt(ipt[type])
    if (value < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.resetScrollView(true)

    t('排行榜.页码跳转', {
      type,
      page: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
