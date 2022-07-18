/*
 * @Author: czy0729
 * @Date: 2022-07-18 13:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 13:39:03
 */
import i18n from '@constants/i18n'

export const DATA = {
  showRelation: '前传 / 续作',
  showTags: '标签',
  showSummary: '简介',
  showInfo: '详情',
  showThumbs: '预览图',
  showGameInfo: '游戏条目信息',
  showRating: '评分',
  showCharacter: '角色',
  showStaff: '制作人员',
  showRelations: '关联条目',
  showCatalog: '目录',
  showRecent: '动态',
  showBlog: '日志',
  showTopic: '帖子',
  showLike: '猜你喜欢',
  showComment: '吐槽'
} as const

export const VALUES = ['显示', '折叠', '隐藏'] as const

export const VALUES_2 = ['显示', '隐藏'] as const

export const TEXTS = {
  showCount: {
    hd: '其他用户收藏数量',
    information: '站点所有用户各收藏状态计数'
  },
  showEpInput: {
    hd: '进度输入框',
    information: '批量快速操作章节看过，也可用于标记到没有录入的章节'
  },
  showCustomOnair: {
    hd: '自定义放送时间块',
    information: `收藏状态为在看的动画，章节的右下方，${i18n.initial()}值为线上放送时间，手动更改后首页收藏排序以此为准`
  },
  layout: {
    text: '页面布局',
    search: Object.keys(DATA)
      .map(key => DATA[key])
      .join()
  }
} as const
