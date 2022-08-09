/*
 * @Author: czy0729
 * @Date: 2022-07-12 09:57:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 11:45:36
 */
import { _ } from '@stores'
import { ExcludeState, State, InitItem, PinYinFirstCharacter } from './types'

/** 每个 <Item> 的状态 */
export const INIT_ITEM: InitItem = {
  expand: false,
  doing: false
}

/** 不参与本地化的 state */
export const EXCLUDE_STATE: ExcludeState = {
  modal: {
    title: '',
    desc: ''
  },
  grid: {
    subject_id: 0,
    subject: {},
    ep_status: ''
  },
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  },
  filter: '',
  filterPage: -1,
  isFocused: true,
  renderedTabsIndex: []
}

/** state */
export const STATE: State & ExcludeState = {
  visible: false,
  subjectId: 0,
  page: 0,
  top: [],
  item: {},
  current: 0,
  ...EXCLUDE_STATE,
  _loaded: false
}

/** 列表布局 ep 按钮最大数量 */
export const PAGE_LIMIT_LIST = 4 * 8

/** 网格布局 ep 按钮最大数量 */
export const PAGE_LIMIT_GRID = 4 * 6

/** 基本 Tabs */
export const TABS = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'anime',
    title: '动画'
  },
  {
    key: 'book',
    title: '书籍'
  },
  {
    key: 'real',
    title: '三次元'
  }
] as const

/** 带游戏类型的 Tabs */
export const TABS_WITH_GAME = [
  ...TABS,
  {
    key: 'game',
    title: '游戏'
  }
] as const

/** <Tabs> 组件高度 */
export const H_TABBAR = 48

/** <Tabs> 上面的 <BlurView> 预留高度 (iOS 用) */
export const OFFSET_LISTVIEW = _.ios(_.headerHeight + H_TABBAR, 0)

/** 唯一命名空间 */
export const NAMESPACE = 'ScreenHomeV2'

/** 缓存 getPinYinFirstCharacter() 的计算结果 */
export const PIN_YIN_FIRST_CHARACTER: PinYinFirstCharacter = {}
