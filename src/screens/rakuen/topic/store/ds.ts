/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:20:18
 */
import { _ } from '@stores'
import { Comments, Topic } from '@stores/rakuen/types'
import { CompletionItem, Id, Loaded, TranslateResult } from '@types'
import { COMPONENT } from '../ds'
import { FilterType } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 头部是否固定 */
  fixed: false,

  /** 可视范围底部 y */
  visibleBottom: Math.floor(_.window.height * 1.2),

  /** 当前页面实例是否在路由栈中 (用于退出页面后马上拦截剩余的请求) */
  focused: false,

  /** 当前页面实例是否操作过 (用于进入页面时不显示过多看不见的模块) */
  scrolled: false
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 是否显示头顶吸附标题组件 */
  showHeaderTitle: false,

  /** 回复框 placeholder */
  placeholder: '',

  /** 回复框 value */
  value: '',

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub: '',

  /** 若提交回复的时候存在此值, 调用编辑回复逻辑 */
  editPostId: '' as Id,

  /** 存放子回复 html */
  message: '',

  /** 翻译缓存 */
  translateResult: [] as TranslateResult,

  /** 楼层翻译缓存 */
  translateResultFloor: {},

  /** OTA 帖子快照 */
  topic: {
    _loaded: 0
  } as Topic,

  /** OTA 帖子回复快照 */
  comments: {
    list: [],
    pagination: {
      page: 0,
      pageTotal: 0
    },
    _list: [],
    _loaded: 0
  } as Comments,

  /** 评论是否只看跳转楼层 */
  filterPost: '',

  /** 是否显示锐评框 */
  chatModalVisible: false,

  /** 锐评请求中 */
  chatLoading: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 展开的子楼层id */
  expands: [],

  /**
   * 评论是否只看
   *  - follow 关注
   *  - likes 贴贴
   *  - me 我
   *  - friends 好友
   * */
  filterType: '' as FilterType,

  /** 评论是否倒序 */
  reverse: false,

  /** 收藏帖子 */
  favor: {
    /** 是否收藏帖子 */
    favored: false,

    /** 收藏帖子的人数 */
    count: 0,

    _loaded: 0 as Loaded
  },

  /** 导演位置 */
  directIndex: -1,

  /** 导演位置楼层名 */
  directFloor: '',

  /** 锐评 */
  chat: {
    bangumi: [] as CompletionItem[],
    burakkuSakura: [] as CompletionItem[],
    miku: [] as CompletionItem[],
    index: -1,
    _loaded: false as Loaded
  },

  /** 页面初始化 */
  _loaded: false as Loaded
}
