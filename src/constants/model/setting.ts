/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:16:00
 *
 * 字典 - 设置 / 时区
 */
import { IOS } from '../env'
import { Model } from './utils'

export const SETTING_HOME_LAYOUT = [
  {
    label: '列表',
    value: 'list'
  },
  {
    label: '网格',
    value: 'grid'
  }
] as const

/** [设置] 首页收藏布局 */
export const MODEL_SETTING_HOME_LAYOUT = new Model(SETTING_HOME_LAYOUT, 'SETTING_HOME_LAYOUT')

/** [设置] 首页收藏网格布局时，条目封面形状 */

export const SETTING_HOME_GRID_COVER_LAYOUT = [
  {
    label: '正方形',
    value: 'square'
  },
  {
    label: '长方形',
    value: 'rectangle'
  }
] as const

/** [设置] 首页收藏网格布局时，条目封面形状 */
export const MODEL_SETTING_HOME_GRID_COVER_LAYOUT = new Model(
  SETTING_HOME_GRID_COVER_LAYOUT,
  'SETTING_HOME_GRID_COVER_LAYOUT'
)

/** [设置] 放送数字显示 */

export const SETTING_HOME_COUNT_VIEW = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'B',
    value: 'B'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'D',
    value: 'D'
  }
] as const

/** [设置] 放送数字显示 */
export const MODEL_SETTING_HOME_COUNT_VIEW = new Model(
  SETTING_HOME_COUNT_VIEW,
  'SETTING_HOME_COUNT_VIEW'
)

/** [设置] 首页收藏排序 */

export const SETTING_HOME_SORTING = [
  {
    label: 'APP',
    value: 'default'
  },
  {
    label: '放送',
    value: 'onair'
  },
  {
    label: '网页',
    value: 'web'
  }
] as const

/** [设置] 首页收藏排序 */
export const MODEL_SETTING_HOME_SORTING = new Model(SETTING_HOME_SORTING, 'SETTING_HOME_SORTING')

/** [设置] 首页动画额外信息显示位置 */

export const SETTING_HOME_ANIME_INFO_INLINE = [
  {
    label: '不显示',
    value: '0'
  },
  {
    label: '底部',
    value: '1'
  },
  {
    label: '行内',
    value: '2'
  }
] as const

/** [设置] 首页动画额外信息显示位置 */
export const MODEL_SETTING_HOME_ANIME_INFO_INLINE = new Model(
  SETTING_HOME_ANIME_INFO_INLINE,
  'SETTING_HOME_ANIME_INFO_INLINE'
)

/** [设置] 启动页面 */

export const SETTING_INITIAL_PAGE = [
  {
    label: '发现',
    value: 'Discovery'
  },
  {
    label: '时间胶囊',
    value: 'Timeline'
  },
  {
    label: '进度',
    value: 'Home'
  },
  {
    label: '超展开',
    value: 'Rakuen'
  },
  {
    label: '时光机',
    value: 'User'
  },
  {
    label: '小圣杯',
    value: 'Tinygrail'
  }
] as const

/** [设置] 启动页面 */
export const MODEL_SETTING_INITIAL_PAGE = new Model(SETTING_INITIAL_PAGE, 'SETTING_INITIAL_PAGE')

/** [设置] 字号 */

export const SETTING_FONTSIZE_ADJUST = [
  {
    label: '-2',
    value: '-2'
  },
  {
    label: '-1',
    value: '-1'
  },
  {
    label: '标准',
    value: '0'
  },
  {
    label: '+1',
    value: '+1'
  },
  {
    label: '+2',
    value: '+2'
  },
  {
    label: '+4',
    value: '+4'
  }
] as const

/** [设置] 字间距 */

export const SETTING_LETTER_SPACING = [
  {
    label: '-1',
    value: '-1'
  },
  {
    label: '-0.5',
    value: '-0.5'
  },
  {
    label: '标准',
    value: '0'
  },
  {
    label: '+0.5',
    value: '+0.5'
  },
  {
    label: '+1',
    value: '+1'
  }
] as const

/** [设置] 用户空间网格个数 */

export const SETTING_USER_GRID_NUM = [
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  }
] as const

/** [设置] 用户空间网格个数 */
export const MODEL_SETTING_USER_GRID_NUM = new Model(SETTING_USER_GRID_NUM, 'SETTING_USER_GRID_NUM')

/** [设置] 切页动画 */

export const SETTING_TRANSITION = [
  {
    label: '水平',
    value: 'horizontal'
  },
  {
    label: '垂直',
    value: 'vertical'
  },
  {
    label: IOS ? '渐变' : '居中缩放',
    value: 'scale'
  }
] as const

/** [设置] 切页动画 */
export const MODEL_SETTING_TRANSITION = new Model(SETTING_TRANSITION, 'SETTING_TRANSITION')

/** [设置] 条目版块分割线样式 */

export const SETTING_SUBJECT_SPLIT_STYLES = [
  {
    label: '不使用',
    value: 'off'
  },
  {
    label: '分割线 (1)',
    value: 'line-1'
  },
  {
    label: '分割线 (2)',
    value: 'line-2'
  },
  {
    label: '标题 (粉)',
    value: 'title-main'
  },
  {
    label: '标题 B (粉)',
    value: 'underline-main'
  },
  {
    label: '标题 (橙)',
    value: 'title-warning'
  },
  {
    label: '标题 B (橙)',
    value: 'underline-warning'
  },
  {
    label: '标题 (蓝)',
    value: 'title-primary'
  },
  {
    label: '标题 B (蓝)',
    value: 'underline-primary'
  },
  {
    label: '标题 (绿)',
    value: 'title-success'
  },
  {
    label: '标题 B (绿)',
    value: 'underline-success'
  }
] as const

/** [设置] 条目版块分割线样式 */
export const MODEL_SETTING_SUBJECT_SPLIT_STYLES = new Model(
  SETTING_SUBJECT_SPLIT_STYLES,
  'SETTING_SUBJECT_SPLIT_STYLES'
)

/** [设置] CDN 源头 */

export const SETTING_CDN_ORIGIN = [
  {
    label: 'fastly',
    value: 'fastly'
  },
  {
    label: 'jsDelivr',
    value: 'jsDelivr'
  },
  {
    label: 'OneDrive',
    value: 'OneDrive'
  },
  {
    label: 'magma',
    value: 'magma'
  }
] as const

/** [设置] CDN 源头 */
export const MODEL_SETTING_CDN_ORIGIN = new Model(SETTING_CDN_ORIGIN, 'SETTING_CDN_ORIGIN')

/** [设置] Live2D Model */

export const SETTING_LIVE2D_MODEL = [
  {
    label: '全自动 Bangumi 娘',
    value: 'auto_riff'
  },
  {
    label: 'Bangumi 娘 Riff',
    value: 'musume_riff'
  },
  {
    label: '布莱克·樱 Riff',
    value: 'black_riff'
  },
  {
    label: 'Bangumi 娘',
    value: 'musume_classic'
  }
] as const

/** [设置] Live2D Model */
export const MODEL_SETTING_LIVE2D_MODEL = new Model(SETTING_LIVE2D_MODEL, 'SETTING_LIVE2D_MODEL')

/** [设置] 显示服务可用性 */

export const SETTING_SERVER_STATUS = [
  {
    label: '不显示',
    value: 'none'
  },
  {
    label: '降级时',
    value: 'degraded'
  },
  {
    label: '中断时',
    value: 'down'
  }
] as const

/** [设置] 评论默认展示行数 */

export const SETTING_USER_COMMENTS_LINES = [
  {
    label: '4',
    value: '4'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '不限制',
    value: '100'
  }
] as const

/** [设置] 评论默认展示行数 */
export const MODEL_USER_COMMENTS_LINES = new Model(
  SETTING_USER_COMMENTS_LINES,
  'SETTING_USER_COMMENTS_LINES'
)

/** [设置] 显示服务可用性 */
export const MODEL_SETTING_SERVER_STATUS = new Model(SETTING_SERVER_STATUS, 'SETTING_SERVER_STATUS')

/** [设置] 楼层导航条方向 */

export const TIMEZONE = [
  {
    label: '默认时区',
    value: '9999'
  },
  {
    label: '(GMT -12:00) Eniwetok, Kwajalein',
    value: '-12'
  },
  {
    label: '(GMT -11:00) Midway Island, Samoa',
    value: '-11'
  },
  {
    label: '(GMT -10:00) Hawaii',
    value: '-10'
  },
  {
    label: '(GMT -09:00) Alaska',
    value: '-9'
  },
  {
    label: '(GMT -08:00) Pacific Time (US & Canada), Tijuana',
    value: '-8'
  },
  {
    label: '(GMT -07:00) Mountain Time (US & Canada), Arizona',
    value: '-7'
  },
  {
    label: '(GMT -06:00) Central Time (US & Canada), Mexico City',
    value: '-6'
  },
  {
    label: '(GMT -05:00) Eastern Time (US & Canada), Bogota, Lima, Quito',
    value: '-5'
  },
  {
    label: '(GMT -04:00) Atlantic Time (Canada), Caracas, La Paz',
    value: '-4'
  },
  {
    label: '(GMT -03:30) Newfoundland',
    value: '-3.5'
  },
  {
    label: '(GMT -03:00) Brassila, Buenos Aires, Georgetown, Falkland Is',
    value: '-3'
  },
  {
    label: '(GMT -02:00) Mid-Atlantic, Ascension Is., St. Helena',
    value: '-2'
  },
  {
    label: '(GMT -01:00) Azores, Cape Verde Islands',
    value: '-1'
  },
  {
    label: '(GMT) Casablanca, Dublin, Edinburgh, London, Lisbon, Monrovia',
    value: '0'
  },
  {
    label: '(GMT +01:00) Amsterdam, Berlin, Brussels, Madrid, Paris, Rome',
    value: '1'
  },
  {
    label: '(GMT +02:00) Cairo, Helsinki, Kaliningrad, South Africa',
    value: '2'
  },
  {
    label: '(GMT +03:00) Baghdad, Riyadh, Moscow, Nairobi',
    value: '3'
  },
  {
    label: '(GMT +03:30) Tehran',
    value: '3.5'
  },
  {
    label: '(GMT +04:00) Abu Dhabi, Baku, Muscat, Tbilisi',
    value: '4'
  },
  {
    label: '(GMT +04:30) Kabul',
    value: '4.5'
  },
  {
    label: '(GMT +05:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
    value: '5'
  },
  {
    label: '(GMT +05:30) Bombay, Calcutta, Madras, New Delhi',
    value: '5.5'
  },
  {
    label: '(GMT +05:45) Katmandu',
    value: '5.75'
  },
  {
    label: '(GMT +06:00) Almaty, Colombo, Dhaka, Novosibirsk',
    value: '6'
  },
  {
    label: '(GMT +06:30) Rangoon',
    value: '6.5'
  },
  {
    label: '(GMT +07:00) Bangkok, Hanoi, Jakarta',
    value: '7'
  },
  {
    label: '(GMT +08:00) Beijing, Hong Kong, Perth, Singapore, Taipei',
    value: '8'
  },
  {
    label: '(GMT +09:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk',
    value: '9'
  },
  {
    label: '(GMT +09:30) Adelaide, Darwin',
    value: '9.5'
  },
  {
    label: '(GMT +10:00) Canberra, Guam, Melbourne, Sydney, Vladivostok',
    value: '10'
  },
  {
    label: '(GMT +11:00) Magadan, New Caledonia, Solomon Islands',
    value: '11'
  },
  {
    label: '(GMT +12:00) Auckland, Wellington, Fiji, Marshall Island',
    value: '12'
  }
] as const
