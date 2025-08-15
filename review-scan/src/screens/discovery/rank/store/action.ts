/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:14:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 15:24:22
 */
import { ScrollTo } from '@components'
import { feedback, info, updateVisibleBottom } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_TAG_ORDERBY,
  TEXT_MENU_FAVOR,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_TOOLBAR,
  WEB
} from '@constants'
import {
  Airtime,
  Area,
  Classification,
  ModelType,
  Month,
  RankFilter,
  RankFilterSub,
  Source,
  SubjectTypeCn,
  Tag,
  TagOrderCn,
  Target,
  Theme
} from '@types'
import { ToolBarKeys } from '../types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** ScrollView.scrollTo */
  scrollTo: ScrollTo

  /** 收集 ScrollView.scrollTo 引用 */
  forwardRef = (scrollTo: ScrollTo) => {
    if (scrollTo) this.scrollTo = scrollTo
  }

  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  refresh = async (refresh?: boolean) => {
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
      } else if (WEB) {
        scrollToTop(0, false)
      }
    }, 0)
  }

  /** 类型选择 */
  onTypeSelect = (type: SubjectTypeCn) => {
    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type),
      filter: '',
      filterSub: '',
      source: '全部',
      tag: '全部',
      area: '全部',
      target: '全部',
      classification: '全部',
      theme: '全部'
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.类型选择', {
      type
    })
  }

  /** 排序选择 */
  onSortSelect = (sort: TagOrderCn) => {
    this.setState({
      sort: MODEL_TAG_ORDERBY.getValue(sort)
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.排序选择', {
      sort
    })
  }

  /** 展开收起更多筛选 */
  onExpand = () => {
    const value = !this.state.expand
    this.setState({
      expand: value
    })
    this.save()
  }

  /** 筛选选择 */
  onFilterSelect = (filter: RankFilter | '全部', model: ModelType) => {
    this.setState({
      filter: (filter === '全部' ? '' : model.getValue(filter)) || ''
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.筛选选择', {
      filter
    })
  }

  /** 筛选选择 */
  onFilterSubSelect = (filterSub: RankFilterSub | '全部', model: ModelType) => {
    this.setState({
      filterSub: (filterSub === '全部' ? '' : model.getValue(filterSub)) || ''
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.二级分类选择', {
      filterSub
    })
  }

  /** 返回第一页 */
  onResetPage = () => {
    const { type, currentPage, ipt } = this.state
    this.setState({
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [type]: 1
      },
      ipt: {
        ...ipt,
        [type]: '1'
      }
    })
  }

  /** 年选择 */
  onAirdateSelect = (airtime: Airtime) => {
    this.setState({
      airtime,
      month: '全部'
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.年选择', {
      airtime
    })
  }

  /** 月选择 */
  onMonthSelect = (month: Month) => {
    const { airtime } = this.state
    if (airtime === '全部') {
      info('请先选择年')
      return
    }

    this.setState({
      month
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.月选择', {
      month
    })
  }

  /** 来源选择 */
  onSourceSelect = (source: Source) => {
    this.setState({
      source
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.来源选择', {
      source
    })
  }

  /** 公共标签选择 */
  onTagSelect = (tag: Tag) => {
    this.setState({
      tag
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.公共标签选择', {
      tag
    })
  }

  /** 地区选择 */
  onAreaSelect = (area: Area) => {
    this.setState({
      area
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.地区选择', {
      area
    })
  }

  /** 受众选择 */
  onTargetSelect = (target: Target) => {
    this.setState({
      target
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.受众选择', {
      target
    })
  }

  /** 分级选择 */
  onClassificationSelect = (classification: Classification) => {
    this.setState({
      classification
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.分级选择', {
      classification
    })
  }

  /** 题材选择 */
  onThemeSelect = (theme: Theme) => {
    this.setState({
      theme
    })
    this.onResetPage()
    this.refresh(true)

    t('排行榜.题材选择', {
      theme
    })
  }

  /** 切换布局 */
  onToggleList = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.refresh()

    info(this.toolBar?.[1])
    feedback(true)

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

    if (key === 'fixed') {
      info(this.toolBar?.[0])
      feedback(true)
    } else if (key === 'collected') {
      info(this.toolBar?.[2])
      feedback(true)
    } else if (key === 'fixedPagination') {
      info(this.toolBar?.[3])
      feedback(true)
    }

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
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.refresh(true)

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
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.refresh(true)

    t('排行榜.下一页', {
      type,
      page: value
    })
  }

  /** 输入框改变 */
  onPaginationInputChange = ({ nativeEvent }) => {
    const { type, ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [type]: nativeEvent.text
      }
    })
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleToolbar('fixed')
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onToggleList()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleToolbar('collected')
    if (title.includes(TEXT_MENU_PAGINATION)) return this.onToggleToolbar('fixedPagination')
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
      visibleBottom: EXCLUDE_STATE.visibleBottom,
      currentPage: {
        ...currentPage,
        [type]: value
      },
      ipt: {
        ...ipt,
        [type]: String(value)
      }
    })
    this.refresh(true)

    t('排行榜.页码跳转', {
      type,
      page: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
