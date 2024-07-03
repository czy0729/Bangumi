/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:50:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-03 15:06:27
 */
import { _ } from '@stores'
import { Comments, Topic } from '@stores/rakuen/types'
import { STORYBOOK } from '@constants'
import { Id, Loaded } from '@types'
import { FilterType } from '../types'

export const NAMESPACE = 'ScreenTopic'

export const EXCLUDE_STATE = {
  /** 头部是否固定 */
  fixed: false,

  /** 是否完成渲染 */
  rendered: STORYBOOK,

  /** 可视范围底部 y */
  visibleBottom: _.window.height,

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
  translateResult: [],

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
  filterPost: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 展开的子楼层id */
  expands: [],

  /**
   * 评论是否只看
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
  directFloor: '',

  /** 页面初始化 */
  _loaded: false as Loaded
}
