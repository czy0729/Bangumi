/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 14:36:44
 */
import { Crt, Ep, Staff, SubjectFormHTML } from '@stores/subject/types'
import {
  Collection,
  Cover,
  Loaded,
  Override,
  Rating,
  SubjectId,
  SubjectTypeValue
} from '@types'

/** 唯一命名空间 */
export const NAMESPACE = 'ScreenSubject'

/** 分数数据结构 */
export const INIT_RATING = {
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  },
  score: '',
  total: ''
}

/** 页面 store 初始化后需要还原的 state */
export const EXCLUDE_STATE = {
  /** 是否显示管理模态框 */
  visible: false,

  /** 是否显示目录管理模态框 */
  folder: false,

  /** 页面是否渲染完毕 */
  rendered: false,

  /** 书籍章 */
  chap: '',

  /** 书籍卷 */
  vol: '',

  /** 翻译缓存 */
  translateResult: [],

  /** 曲目名字翻译缓存 */
  discTranslateResult: [],

  /** 云端缓存的条目信息 */
  subject: {} as Override<
    Omit<
      SubjectFormHTML,
      'type' | 'watchedEps' | 'friend' | 'who' | 'formhash' | '_loaded'
    >,
    {
      id: SubjectId
      type: SubjectTypeValue
      name: string
      name_cn: string
      image: Cover<'c'>
      eps: Ep[]
      collection: Collection
      summary: string
      rating: Rating
      character: Crt[]
      staff: Staff[]
      titleLabel: string
      _loaded: Loaded
    }
  >
}

/** 关联模块排序优先级 (按描述) */
export const SORT_RELATION_DESC = {
  动画: 110,
  续集: 100,
  前传: 90,
  主线故事: 82,
  剧场版: 81,
  番外篇: 80,
  相同世界观: 79,
  衍生: 78,
  书籍: 70,
  片头曲: 65,
  片尾曲: 64,
  原声集: 63,
  角色歌: 62,
  游戏: 40,
  三次元: 30,
  其他: -10
} as const
