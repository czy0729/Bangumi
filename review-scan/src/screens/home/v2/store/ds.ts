/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 03:01:36
 */
import { _ } from '@stores'
import { Loaded, Override, Subject, SubjectId } from '@types'

/** 唯一命名空间 */
export const NAMESPACE = 'ScreenHomeV2'

/** 每个 Item 的状态 */
export const INIT_ITEM = {
  expand: false,
  doing: false
}

/** 不参与本地化的 state */
export const EXCLUDE_STATE = {
  /** Modal 可见性 */
  visible: false,

  /** 可视范围底部 y */
  visibleBottom: _.window.height,
  modal: {
    title: '',
    desc: ''
  },
  progress: {
    fetching: false,
    fetchingSubjectId1: 0 as SubjectId,
    fetchingSubjectId2: 0 as SubjectId,
    message: '',
    current: 0,
    total: 0
  },
  filter: '',
  filterPage: -1,
  isFocused: true,
  renderedTabsIndex: [] as number[],
  flip: 0 as SubjectId,

  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

/** state */
export const STATE = {
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
    subject: {} as Override<
      Subject,
      {
        time?: string
      }
    >,
    ep_status: '' as string | number
  },

  /** 初始化次数 */
  boot: 0,

  ...EXCLUDE_STATE,
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
