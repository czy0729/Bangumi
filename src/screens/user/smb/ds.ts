/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 16:17:22
 */
export const ACTIONS_SORT = ['日期', '评分', '评分人数', '目录修改时间'] as const

export const ACTIONS_SMB = ['扫描', '编辑', '复制配置新建', '删除'] as const

export const NAMESPACE = 'ScreenSmb'

export const EXCLUDE_STATE = {
  data: [],
  loading: false,
  tags: [],
  expand: false,

  // form
  visible: false,
  id: '',
  name: '',
  ip: '',
  port: '',
  username: '',
  password: '',
  sharedFolder: '',
  workGroup: '',
  path: '',
  url: 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'
}

export const STATE = {
  uuid: '',
  sort: ACTIONS_SORT[0] as typeof ACTIONS_SORT[number],
  filter: '',
  ...EXCLUDE_STATE,
  _loaded: false
}

/** https://github.com/MagmaBlock/LavaAnimeWeb/blob/main/assets/dict.json */
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
  // {
  //   reg: /(AT-X)/,
  //   val: 'AT-X'
  // },
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

export const ICONS = {
  file: require('@assets/cloud/file.png'),
  open: require('@assets/cloud/folder-open.png'),
  folder: require('@assets/cloud/folder.png'),
  music: require('@assets/cloud/music.png'),
  pic: require('@assets/cloud/pic.png'),
  video: require('@assets/cloud/video.png'),
  zip: require('@assets/cloud/zip.png'),
  origin: require('@assets/cloud/origin.png')
} as const
