/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 20:54:21
 */
export const NAMESPACE = 'ScreenSubject'

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

export const EXCLUDE_STATE = {
  visible: false, // 是否显示管理模态框
  folder: false, // 是否显示目录管理模态框
  rendered: false,

  chap: '', // 书籍章
  vol: '', // 卷
  translateResult: [], // 翻译缓存
  discTranslateResult: [] // 曲目名字翻译缓存
}

export const SORT_RELATION_DESC = {
  动画: 110,
  续集: 100,
  前传: 90,
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
}
