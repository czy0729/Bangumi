/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:24:57
 */
import { _ } from '@stores'

import type { Loaded, Override, Subject, SubjectId } from '@types'

/** 唯一命名空间 */
export const NAMESPACE = 'ScreenHomeV2'

/** 每个 Item 的状态 */
export const INIT_ITEM = {
  expand: false,
  doing: false
}

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** Tabs 是否切换中 */
  swiping: false
}

/** 不参与本地化的 state */
export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 收藏模态框是否可见 */
  visible: false,

  /** 收藏模态框 */
  modal: {
    title: '',
    desc: ''
  },

  /** 用于列队刷新收藏状态 */
  progress: {
    fetching: false,
    fetchingSubjectId1: 0 as SubjectId,
    fetchingSubjectId2: 0 as SubjectId,
    message: '',
    current: 0,
    total: 0
  },

  /** 收藏标题筛选 */
  filter: '',

  /** 当前应该筛选的 Tabs 页码 */
  filterPage: -1,

  /** 是否聚焦 */
  isFocused: true,

  /** 已经初始化的 Tabs 页码 */
  renderedTabsIndex: [] as number[],

  /** 是否允许章节按钮翻页动画 */
  flip: 0 as SubjectId,

  /** 是否加载已 bangumi-data */
  loadedBangumiData: false
}

/** state */
export const STATE = {
  ...EXCLUDE_STATE,

  /** Modal 当前使用的条目 Id */
  subjectId: 0 as SubjectId,

  /** Tabs 当前页数 */
  page: 0,

  /** Item 置顶记录 */
  top: [] as SubjectId[],

  /** 每个 Item 的状态 */
  item: {} as Record<SubjectId, typeof INIT_ITEM>,

  /** 格子布局当前选中的条目 Id */
  current: 0 as SubjectId,

  /** 格子布局当前选中的条目临时存放信息 */
  grid: {
    subject_id: 0 as SubjectId,
    subject: {} as Partial<
      Override<
        Subject,
        {
          time?: string
        }
      >
    >,
    ep_status: '' as string | number
  },

  /** 初始化次数 */
  boot: 0,

  _loaded: false as Loaded
}

/** 列表布局 ep 按钮最大数量 */
export const PAGE_LIMIT_LIST = 4 * 8

/** 网格布局 ep 按钮最大数量 */
export const PAGE_LIMIT_GRID = 4 * 6

export const BANGUMI_INFO = {
  title: '',
  type: 'tv',
  sites: [] as any,
  titleTranslate: {
    'zh-Hans': [] as any
  }
} as const

export const TEXT_PIN = '置顶'

export const TEXT_UNPIN = '取消置顶'

export const TEXT_EXPAND_ALL = '全部展开'

export const TEXT_COLLAPSE_ALL = '全部收起'

export const TEXT_ADD_REMINDER = '一键添加提醒'

export const TEXT_EXPORT_SCHEDULE = '导出放送日程ICS'
