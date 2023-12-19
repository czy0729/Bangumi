/*
 * @Author: czy0729
 * @Date: 2022-04-28 11:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 05:29:59
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenBilibili'

export const EXCLUDE_STATE = {
  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

export const STATE = {
  /** 追番记录 (bili) */
  data: {
    list: [],
    _loaded: 0
  },

  /** 番剧信息 (bili) */
  reviews: {},

  /** 收藏信息 (bgm) */
  collections: {},

  /** 置底数据 */
  bottom: {
    current: 0
  },

  /** 收起 (弹窗) */
  hide: false,

  /** 隐藏看过的条目 */
  hideWatched: false,

  /** 隐藏相同收藏的条目 */
  hideSame: false,

  /** 隐藏未匹配的条目 */
  hideNotMatched: false,

  /** 收藏是否可见 */
  privacy: false,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}

export const HOST_API = 'https://api.bgm.tv'

/** 存放请求缓存 */
export const LOADED = {}

/** 手动纠正 */
export const MEDIA_SUBJECT = {
  28220978: 1424, // 轻音少女 第一季
  28235244: 330973, // 陰陽眼見子
  28235419: 317042, // 理科生坠入情网，故尝试证明。 第二季
  28236365: 326868, // 天才王子的赤字國家重生術
  28236374: 333158, // 戀上換裝娃娃
  28236378: 323626, // SLOW LOOP-女孩的釣魚慢活-
  28236382: 341077, // 怪人開發部的黑井津小姐
  28236394: 344422, // 秘密內幕-女警的反擊
  28236424: 321825, // 相愛相殺
  28236579: 348666, // 川尻小玉的懒散生活
  3846: 35861 // 强袭魔女 OVA
} as const
