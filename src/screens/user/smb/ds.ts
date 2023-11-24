/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 17:32:39
 */
import { IOS, STORYBOOK } from '@constants'
import { SubjectId } from '@types'
import { SubjectOSS } from './types'

/** 数据分页项数 */
export const LIMIT = 24

/** 排序菜单 */
export const ACTIONS_SORT = [
  '日期',
  '评分',
  '评分人数',
  '名称',
  '文件夹修改时间'
] as const

export const ACTION_EDIT = '编辑'

export const ACTION_OPEN_DIRECTORY = '展开文件夹'

export const ACTION_CLOSE_DIRECTORY = '收起文件夹'

export const ACTION_DELETE = '删除'

export const ACTION_CONNECT = '扫描'

export const ACTION_COPY_AND_CREATE = '复制配置新建'

export const ACTION_COPY_AND_CREATE_FOLDER = '创建用户目录'

/** 服务菜单 */
export const ACTIONS_SMB = STORYBOOK
  ? ([
      ACTION_EDIT,
      ACTION_OPEN_DIRECTORY,
      ACTION_CLOSE_DIRECTORY,
      ACTION_DELETE
    ] as const)
  : ([
      ACTION_CONNECT,
      ACTION_EDIT,
      ACTION_COPY_AND_CREATE,
      ACTION_COPY_AND_CREATE_FOLDER,
      ACTION_DELETE
    ] as const)

/** 本地化保存空间 */
export const NAMESPACE = 'ScreenSmb'

/** 文件夹服务默认跳转 */
export const URL_DIRECTORY_DEFAULT = ''

/** smb 服务默认跳转 */
export const URL_SMB_DEFAULT = 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'

/** webDAV 服务默认跳转 */
export const URL_WEBDAV_DEFAULT = 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'

/** 排除本地化的状态 */
export const EXCLUDE_STATE = {
  /** @todo */
  data: [],

  /** 当前选择的标签 */
  tags: [],

  /** 是否请求中 */
  loading: false,

  /** @todo */
  expand: false,

  /** @todo */
  more: false,

  /** 用于强制刷新组件 */
  refreshKey: 0,

  /** [表单] 是否显示 */
  visible: false,

  /** [表单] uuid */
  id: '',

  /** [表单] 服务别名 */
  name: '',

  /** [表单] ip */
  ip: '',

  /** [表单] 端口 */
  port: '',

  /** [表单] 用户名 */
  username: '',

  /** [表单] 密码 */
  password: '',

  /** [表单] 路径 */
  sharedFolder: '',

  /** [表单] 工作组 */
  workGroup: '',

  /** [表单] 文件夹 */
  path: '',

  /** [表单] 跳转 */
  url: STORYBOOK ? URL_DIRECTORY_DEFAULT : IOS ? URL_WEBDAV_DEFAULT : URL_SMB_DEFAULT,

  /** [通用配置表单] 是否显示 */
  configVisible: false,

  /** 网格布局, 显示文件夹结构弹窗 */
  folders: {
    visible: false,
    title: '',
    subjectId: 0 as SubjectId,
    folder: {
      name: '',
      lastModified: '',
      path: '',
      list: [],
      ids: [],
      tags: []
    },
    merge: []
  }
}

/** 本地化的状态 */
export const STATE = {
  /** 当前选择的服务 uuid */
  uuid: '',

  /** 排序 */
  sort: ACTIONS_SORT[0] as (typeof ACTIONS_SORT)[number],

  /** 过滤输入框 */
  _filter: '',

  /** 当前过滤 */
  filter: '',

  /** 记录文件夹是否默认显示文件全名列表 */
  files: {} as Record<string, boolean>,

  /** 记录文件夹是否默认展开 */
  expands: {} as Record<string, boolean>,

  /** 通用配置 */
  configs: {
    layoutList: false,
    layoutGridNums: 3 as 2 | 3 | 4,
    showDDPlay: true,
    showPotPlayer: false,
    showVLC: false,
    showMPV: false
  },

  /** 是否 windows 环境, 需要对路径中斜杠进行转换 */
  isWindows: true,

  /** [表单] 服务类型是否 webDAV */
  webDAV: IOS,

  /** [表单] 提交表单时时候进行自动刮削条目信息 */
  autoJA: true,

  /** 分页输入框 */
  _page: '1',

  /** 分页当前页码 */
  page: 1,

  /** 缓存条目快照 */
  subjects: {} as Record<`subject_${SubjectId}`, SubjectOSS>,

  ...EXCLUDE_STATE,
  _loaded: false
}

/**
 * 视频文件常用标识
 * https://github.com/MagmaBlock/LavaAnimeWeb/blob/main/assets/dict.json
 * */
export const DICT = [
  {
    reg: /(1080(P|p)|1920(X|×)1080)/,
    val: '1080P'
  },
  {
    reg: /2160(P|p)/,
    val: '2160P'
  },
  {
    reg: /1440(P|p)/,
    val: '1440P'
  },
  {
    reg: /(720(P|p)|1280(X|×)720)/,
    val: '720P'
  },
  {
    reg: /60fps/,
    val: '60FPS'
  },
  {
    reg: /(AVC|x264|h264)/,
    val: 'AVC'
  },
  {
    reg: /(HEVC|x265|H265)/,
    val: 'HEVC'
  },
  {
    reg: /ma10p/,
    val: 'Ma10p'
  },
  {
    reg: /8bit/,
    val: '8bit'
  },
  {
    reg: /Hi10p|10bit/,
    val: '10bit'
  },
  {
    reg: /yuv420p10/,
    val: 'YUV-4:2:0 10bit'
  },
  {
    reg: /(ACC|AAC)/,
    val: 'AAC'
  },
  {
    reg: /flac|FLAC/,
    val: 'FLAC'
  },
  {
    reg: /(opus|OPUSx2)/,
    val: 'OPUS'
  },
  {
    reg: /(web-dl|webrip)/,
    val: 'WEBRip'
  },
  {
    reg: /(bdrip|BD)/,
    val: 'BDRip'
  },
  {
    reg: /(dvdrip|DVD)/,
    val: 'DVDRip'
  },
  {
    reg: /(剧场版|movie|MOVIE)/,
    val: '剧场版'
  },
  {
    reg: /(ova|OVA)/,
    val: 'OVA'
  },
  {
    reg: /(sp|SP)/,
    val: 'SP'
  },
  {
    reg: /(NCOP)/,
    val: '无字OP'
  },
  {
    reg: /(NCED)/,
    val: '无字ED'
  },
  {
    reg: /\.mp4/,
    val: 'MP4'
  },
  {
    reg: /\.mkv/,
    val: 'MKV'
  }
] as const

/** 标签排序规则 */
export const DICT_ORDER = {
  条目: 1101,
  文件夹: 1100,

  动画: 1005,
  书籍: 1004,
  游戏: 1003,
  音乐: 1002,
  三次元: 1001,

  在看: 965,
  看过: 964,
  想看: 963,
  在读: 955,
  读过: 954,
  想读: 953,
  在玩: 945,
  玩过: 944,
  想玩: 943,
  在听: 935,
  听过: 934,
  想听: 933,
  搁置: 902,
  抛弃: 901,
  未收藏: 900,

  '2160P(2K)': 104,
  '1440P': 103,
  '1080P': 102,
  '720P': 101,

  BDRip: 93,
  WEBRip: 92,
  DVDRip: 91,

  '10bit 色深': 81,
  '8bit 色深': 80,

  剧场版: 73,
  OVA: 72,
  SP: 71
} as const

/** 匹配发售日 */
export const REG_AIRDATE =
  /<li><span>(发售日|放送开始|上映年度|上映时间|开始|开始时间|发行日期|连载时间|连载期间|连载日期|连载开始|発表期間|发表期间|発表号): <\/span>(.+?)<\/li>/
