/*
 * @Author: czy0729
 * @Date: 2022-07-18 13:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-26 03:52:44
 */
import { rc } from '@utils/dev'
import { MODEL_SETTING_SUBJECT_SPLIT_STYLES, SETTING_SUBJECT_SPLIT_STYLES } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Subject')

export const DATA = {
  showRelation: '前传 / 续作',
  showEp: '章节',
  showTags: '标签',
  showSummary: '简介',
  showInfo: '详情',
  showThumbs: '预览图',
  showGameInfo: '游戏条目信息',
  showRating: '评分',
  showCharacter: '角色',
  showStaff: '制作人员',
  showAnitabi: '取景地标',
  showRelations: '关联条目',
  showCatalog: '目录',
  showRecent: '动态',
  showBlog: '日志',
  showTopic: '帖子',
  showLike: '猜你喜欢',
  showComic: '单行本',
  showComment: '吐槽'
} as const

export const THUMBS = {
  showRelation: [
    '0/2022/png/386799/1661209910450-16b3c627-295f-40a1-a2ec-7870faeb4c1f.png',
    '0/2022/png/386799/1661209913550-b4af7ba0-6a5c-4059-a041-b7be25d491a5.png'
  ],
  showEp: [
    '0/2022/png/386799/1661211756880-d0abf61a-fa43-4424-aa71-087e70ef1ded.png',
    '0/2022/png/386799/1661211759613-21462348-9c11-4497-8fb4-1d7a742bca9c.png',
    '0/2022/png/386799/1661211761597-084b3fd1-2032-416b-9afa-ab731cdeb2df.png'
  ],
  showTags: ['0/2022/png/386799/1661210180566-de6913da-25ae-4bbc-a43e-97c066945525.png'],
  showSummary: [
    '0/2022/png/386799/1661210189925-bba17696-dd76-4586-81a8-25955f890ed6.png',
    '0/2022/png/386799/1661210197003-59c8df25-c24a-481a-b7c6-66823e798013.png'
  ],
  showInfo: ['0/2022/png/386799/1661210396795-7bc8804d-6704-4f7e-b3d3-e059efcb46d5.png'],
  showThumbs: [
    '0/2022/png/386799/1661210559030-e6ddfee6-c3ce-40b1-8bd4-eea33792a129.png',
    '0/2022/png/386799/1661210561536-2bd8bc5f-e3b4-4445-89b8-91a099f5b24b.png',
    '0/2022/png/386799/1661210564336-1ef74bcd-a15d-4ed6-bdef-d465ffa5cbe6.png'
  ],
  showGameInfo: false,
  showRating: ['0/2022/png/386799/1661210404254-c11d15dd-bbcb-4bdd-a2eb-a5611ca29290.png'],
  showCharacter: ['0/2022/png/386799/1661210775424-81389b5c-888d-4c7c-a51a-a9d5bb1f54cf.png'],
  showStaff: false,
  showRelations: false,
  showAnitabi: [
    '0/2023/png/386799/1673548775309-cfad2c26-a0bf-4808-8846-7a4bc1a49ba8.png',
    '0/2023/png/386799/1673565704431-39a95c3f-2911-4eff-bbbe-5f2862da9286.png'
  ],
  showCatalog: [
    '0/2022/png/386799/1661210861856-595c3ace-d109-4c01-a39e-712515e2a99e.png',
    '0/2022/png/386799/1661211121070-5ab05df8-c5d3-460d-8535-72b1403cfae2.png'
  ],
  showRecent: false,
  showBlog: ['0/2022/png/386799/1661210959469-bfe9246a-fba9-47a4-854e-c7ecb8756e7a.png'],
  showTopic: false,
  showLike: ['0/2022/png/386799/1661211415018-10587b5b-47fc-4cef-b17b-bafa2913b7f9.png'],
  showComic: ['0/2022/png/386799/1661211873095-111ba1c2-19f5-475d-9bc8-e895b0de6d08.png'],
  showComment: ['0/2022/png/386799/1661211511329-99bac0c2-44f1-4945-9db1-0e4af5238040.png']
} as const

export const VALUES = ['显示', '折叠', '隐藏'] as const

export const VALUES_2 = ['显示', '隐藏'] as const

export const LAYOUT_VALUES = [
  {
    label: '显示',
    value: true
  },
  {
    label: '隐藏',
    value: false
  }
] as const

export const TEXTS = {
  splitStyles: {
    setting: {
      title: '版块分割线样式',
      information: '各版块之间默认没有分割，若觉得区分度不够、信息太密集可以考虑开启',
      search: SETTING_SUBJECT_SPLIT_STYLES.map(item => item.label).join()
    },
    off: {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('off')
    },
    'line-1': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('line-1')
    },
    'line-2': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('line-2')
    },
    'title-main': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('title-main')
    },
    'title-warning': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('title-warning')
    },
    'title-primary': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('title-primary')
    },
    'title-success': {
      title: MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel('title-success')
    }
  },
  showAirdayMonth: {
    hd: '发布日期显示到月份'
  },
  htmlExpand: {
    hd: '简介、详情使用新页面展开'
  },
  promoteAlias: {
    hd: '详情中，把别名提前展示'
  },
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
