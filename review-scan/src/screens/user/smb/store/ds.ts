/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 00:06:30
 */
import { IOS, WEB } from '@constants'
import { Id, Loaded, SubjectId } from '@types'
import {
  ACTIONS_SORT,
  COMPONENT,
  URL_DIRECTORY_DEFAULT,
  URL_SMB_DEFAULT,
  URL_WEBDAV_DEFAULT
} from '../ds'
import { SubjectOSS } from '../types'

/** 本地化保存空间 */
export const NAMESPACE = `Screen${COMPONENT}` as const

/** 排除本地化的状态 */
export const EXCLUDE_STATE = {
  /** @todo */
  data: [],

  /** 当前选择的标签 */
  tags: [] as string[],

  /** 当前选择的条目标签 */
  subjectTags: [] as string[],

  /** 是否请求中 */
  loading: false as boolean | string,

  /** 是否批量请求收藏信息中 */
  fetchingCollections: false,

  /** @deprecated */
  expand: false,

  /** @deprecated */
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
  url: WEB ? URL_DIRECTORY_DEFAULT : IOS ? URL_WEBDAV_DEFAULT : URL_SMB_DEFAULT,

  /** [通用配置表单] 是否显示 */
  configVisible: false,

  /** [扩展刮削词表单] 是否显示 */
  extendsJAVisible: false,

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
  uuid: '' as Id,

  /** 排序 */
  sort: ACTIONS_SORT[0] as (typeof ACTIONS_SORT)[number],

  /** 过滤输入框 */
  _filter: '',

  /** 当前过滤 */
  filter: '',

  /** 分页输入框 */
  _page: '1',

  /** 分页当前页码 */
  page: 1,

  /** 记录文件夹是否默认显示文件全名列表 */
  files: {} as Record<string, boolean>,

  /** 记录文件夹是否默认展开 */
  expands: {} as Record<string, boolean>,

  /** 当一个条目下关联到过多文件夹时, 是否折叠展开文件夹列表 */
  foldersExpands: {} as Record<SubjectId, boolean>,

  /** 通用配置 */
  configs: {
    layoutList: false,
    layoutGridNums: 3 as 2 | 3 | 4,
    showDDPlay: true,
    showPotPlayer: false,
    showVLC: false,
    showMPV: false,
    showOpenLocalFolder: false
  },

  /** 扩展刮削词 */
  extendsJA: {
    value: ''
  },

  /** [表单] 服务类型是否 webDAV */
  webDAV: IOS,

  /** [表单] 提交表单时时候进行自动刮削条目信息 */
  autoJA: true,

  /** 缓存条目快照 */
  subjects: {} as Record<`subject_${SubjectId}`, SubjectOSS>,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
