/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 15:35:44
 */
import { WEB } from '@constants'

export const COMPONENT = 'Smb'

/** 数据分页项数 */
export const LIMIT = 24

/** 排序菜单 */
export const ACTIONS_SORT = ['日期', '评分', '评分人数', '名称', '文件夹修改时间'] as const

export const ACTION_EDIT = '编辑'

export const ACTION_OPEN_DIRECTORY = '展开文件夹'

export const ACTION_CLOSE_DIRECTORY = '收起文件夹'

export const ACTION_DELETE = '删除'

export const ACTION_CONNECT = '扫描'

export const ACTION_COPY_AND_CREATE = '复制配置新建'

export const ACTION_COPY_AND_CREATE_FOLDER = '创建用户目录'

/** 服务菜单 */
export const ACTIONS_SMB = WEB
  ? ([ACTION_EDIT, ACTION_OPEN_DIRECTORY, ACTION_CLOSE_DIRECTORY, ACTION_DELETE] as const)
  : ([
      ACTION_CONNECT,
      ACTION_EDIT,
      ACTION_COPY_AND_CREATE,
      ACTION_COPY_AND_CREATE_FOLDER,
      ACTION_DELETE
    ] as const)

/** 文件夹服务默认跳转 */
export const URL_DIRECTORY_DEFAULT = ''

/** smb 服务默认跳转 */
export const URL_SMB_DEFAULT = 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'

/** webDAV 服务默认跳转 */
export const URL_WEBDAV_DEFAULT = 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'

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
