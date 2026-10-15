/*
 * @Author: czy0729
 * @Date: 2024-05-24 10:14:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 06:18:42
 *
 * 排行榜操作: 筛选选择 / 翻页 / 工具栏与布局切换
 */
import { feedback, info, updateVisibleBottom } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_TAG_ORDERBY,
  TEXT_MENU_FAVOR,
  TEXT_MENU_LAYOUT,
  TEXT_MENU_LIST_LOADED,
  TEXT_MENU_PAGINATION,
  TEXT_MENU_TOOLBAR
} from '@constants'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

import type { ScrollTo } from '@components'
import type {
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
import type { ToolBarKeys, FilterEvent, FilterKey, RankType } from '../types'

/** 解析页码输入, 空或非法返回 0 */
function parsePage(text: string) {
  const _text = String(text).trim()
  if (!/^\d+$/.test(_text)) return 0

  const value = Number(_text)
  return Number.isSafeInteger(value) ? value : 0
}

export default class Action extends Fetch {
  /** 列表滚动引用 (由 ScrollView 注入) */
  scrollTo: ScrollTo

  /** 收集 ScrollView.scrollTo 引用 */
  forwardRef = (scrollTo: ScrollTo) => {
    if (scrollTo) this.scrollTo = scrollTo
  }

  /** 保存筛选状态, 可选重新请求, 并把列表滚回顶部 */
  refresh = async (refresh?: boolean) => {
    this.save()

    if (refresh) {
      if (!this.rank._loaded) {
        await this.fetchRank()
      } else {
        this.fetchRank()
      }
    }

    this.delay(() => {
      if (typeof this.scrollTo === 'function') {
        this.scrollTo({
          x: 0,
          y: 0,
          animated: false
        })
        return
      }

      scrollToTop(0, false)
    }, 0)
  }

  /** 提示工具栏菜单的当前状态 */
  tipToolBar = (key: string) => {
    const text = this.toolBar.find(item => item.includes(key))
    if (text) info(text)
    feedback(true)
  }

  /** 更新某类型页码 */
  setPage = (type: RankType, value: number) => {
    const { currentPage, ipt } = this.state
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
  }

  /** 更新单项筛选, 重置页码并刷新 */
  onSelectFilter = (key: FilterKey, value: string, event: FilterEvent) => {
    this.setState({
      [key]: value
    })
    this.onResetPage()
    this.refresh(true)

    t(event, {
      [key]: value
    })
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
    const { type } = this.state
    this.setPage(type, 1)
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
  onSourceSelect = (source: Source) => this.onSelectFilter('source', source, '排行榜.来源选择')

  /** 公共标签选择 */
  onTagSelect = (tag: Tag) => this.onSelectFilter('tag', tag, '排行榜.公共标签选择')

  /** 地区选择 */
  onAreaSelect = (area: Area) => this.onSelectFilter('area', area, '排行榜.地区选择')

  /** 受众选择 */
  onTargetSelect = (target: Target) => this.onSelectFilter('target', target, '排行榜.受众选择')

  /** 分级选择 */
  onClassificationSelect = (classification: Classification) =>
    this.onSelectFilter('classification', classification, '排行榜.分级选择')

  /** 题材选择 */
  onThemeSelect = (theme: Theme) => this.onSelectFilter('theme', theme, '排行榜.题材选择')

  /** 切换布局 */
  onToggleList = () => {
    const value = !this.state.list
    this.setState({
      list: value
    })
    this.refresh()

    this.tipToolBar(TEXT_MENU_LAYOUT)

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

    if (key === 'fixed') this.tipToolBar(TEXT_MENU_TOOLBAR)
    else if (key === 'collected') this.tipToolBar(TEXT_MENU_FAVOR)
    else if (key === 'fixedPagination') this.tipToolBar(TEXT_MENU_PAGINATION)

    t('排行榜.工具栏', {
      [key]: value
    })
  }

  /** 上一页 */
  onPrev = () => {
    const { currentPage, type } = this.state
    if (currentPage[type] === 1) return

    const value = currentPage[type] - 1
    this.setPage(type, value)
    this.refresh(true)

    t('排行榜.上一页', {
      type,
      page: value
    })
  }

  /** 下一页 */
  onNext = () => {
    const { currentPage, type } = this.state
    const value = currentPage[type] + 1
    this.setPage(type, value)
    this.refresh(true)

    t('排行榜.下一页', {
      type,
      page: value
    })
  }

  /** 输入框改变 (跳转由键盘提交或失焦触发) */
  onPaginationInputChange = ({ nativeEvent }: { nativeEvent: { text: string } }) => {
    const { type, ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [type]: nativeEvent.text
      }
    })
  }

  /** 切换分页模式 */
  onTogglePagination = () => {
    const value = !this.state.pagination
    this.setState({
      pagination: value
    })

    this.tipToolBar(TEXT_MENU_LIST_LOADED)

    this.refresh(true)
  }

  /** 工具栏设置 */
  onToolBar = (title: string) => {
    if (title.includes(TEXT_MENU_TOOLBAR)) return this.onToggleToolbar('fixed')
    if (title.includes(TEXT_MENU_LIST_LOADED)) return this.onTogglePagination()
    if (title.includes(TEXT_MENU_LAYOUT)) return this.onToggleList()
    if (title.includes(TEXT_MENU_FAVOR)) return this.onToggleToolbar('collected')
    if (title.includes(TEXT_MENU_PAGINATION)) return this.onToggleToolbar('fixedPagination')
  }

  /** 页码跳转 */
  doSearch = () => {
    const { type, ipt } = this.state
    // 清空输入视为跳第 1 页
    const text = String(ipt[type] ?? '').trim()
    const value = text === '' ? 1 : parsePage(text)
    if (!value) {
      info('请输入正确页码')
      return
    }

    this.setPage(type, value)
    this.refresh(true)

    t('排行榜.页码跳转', {
      type,
      page: value
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
