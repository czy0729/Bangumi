/*
 * @Author: czy0729
 * @Date: 2022-05-23 04:40:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 16:59:37
 */
import { get } from '@utils/crypto'

/** DogeCloud */
export const HOST_DOGE = get(
  'U2FsdGVkX1+2qULvXezwI6fbFGIL7st4kYo0Q2RAf8JEKUaEyfYwKrhjaJ6FHS3ErIS9X8w8Oq1O88AEI37otA=='
) as string

/** DogeCloud */
export const HOST_CDN_AVATAR = get(
  'U2FsdGVkX19B9z0TLPcopsUYzdq1hhviuF8j4ZjtcA+ho5Zr2/GAfv31rFzztvUJ'
) as string

/** AC */
export const HOST_AC = get(
  'U2FsdGVkX18+NeUBv1YBSq12VwWbsXEankm3Ny+BiwKhqlb+FOsCREXehn/XCXzZ'
) as string

/** AC Referer */
export const HOST_AC_REFERER = get('U2FsdGVkX1+/OE8WVts3oK3+JaL1uz9cMxOLvVIfa7M=') as string

/** AC Media */
export const HOST_AC_MEDIA = get(
  'U2FsdGVkX18tQbQLxxzSdTbcT+syc3CK2hQ18Xjl1JgQcFlva8rpm2g2TtuAlpbZ5bmf442WI5XXc+bm7fGwIw=='
) as string

/** AC Search */
export const HOST_AC_SEARCH = get(
  'U2FsdGVkX19cPiZi04KPU7PLiHLJjheGH72/JVRIKZYWMJdyKGYKP5hndd+YaykA'
) as string

/** AC API */
export const HOST_AC_API = get(
  'U2FsdGVkX19j++XUaK4GHQxlRyM3VA+EySvmIbh1RZyE27zKnWselS1mw9/MZpKM'
) as string

/** AC M */
export const HOST_AC_M = get(
  'U2FsdGVkX19GUtKjqhGhpm3du98sYuPIvldHAOaSkkE69pDy1nSFagZ47slT6kqy'
) as string

/** DB */
export const HOST_DB = get(
  'U2FsdGVkX1+/2ktnLLNmVlmlmDQ4PAGeQ0d+lRKBMmKaEVYMv0sHn8vhePargq0T'
) as string

/** DB Referer */
export const HOST_DB_REFERER = get('U2FsdGVkX1/DgrvOtahfnA8Lvo8mMLSQnG7xsHhTn5M=') as string

/** DB Movie */
export const HOST_DB_MOVIE = get(
  'U2FsdGVkX19XXg08u1YCtpUVGtey372dip9kC3Zt9BBGVk1Bp3w/KYqchu7QUKAj'
) as string

/** DB M */
export const HOST_DB_M = get(
  'U2FsdGVkX1/TmfRhRx5bqBI1ttUCvBYkLCeqkPSRyi4a/daVGrsOT8sUwpX8ew2Z'
) as string

/** https://github.com/czy0729/Bangumi-Rakuen */
export const VERSION_RAKUEN = '20241004'

/** ==================== @deprecated ==================== */
/** @deprecated cdn | fastly | gcore | originfastly */
export const HOST_CDN_FASTLY = 'https://fastly.jsdelivr.net'

/** @deprecated OneDrive */
export const HOST_CDN_ONEDRIVE = 'https://bangumi.stdcdn.com'

/** @deprecated OneDrive Static File */
export const HOST_CDN_STATIC = 'https://bangumi-static.stdcdn.com'

/** @deprecated https://github.com/czy0729/Bangumi-Static */
export const VERSION_STATIC = '20220624'

/** @deprecated https://github.com/czy0729/Bangumi-OSS/tree/master/data/avatar/m */
export const VERSION_AVATAR = '20220102'

/** @deprecated https://github.com/czy0729/Bangumi-OSS/tree/master/data/subject/c */
export const VERSION_OSS = '20220103'

/** @deprecated https://github.com/czy0729/Bangumi-Subject */
export const VERSION_SUBJECT = '20220414'

/** @deprecated https://github.com/czy0729/Bangumi-Mono */
export const VERSION_MONO = '20201216'

/** @deprecated https://github.com/czy0729/Bangumi-Static/tree/master/data/agefans */
export const VERSION_ANIME = '20220905'

/** @deprecated https://github.com/czy0729/Bangumi-Static/tree/master/data/wenku8 */
export const VERSION_WENKU = '20210627'

/** @deprecated https://github.com/czy0729/Bangumi-Static/tree/master/data/manhuadb */
export const VERSION_MANGA = '20210628'

/** @deprecated https://github.com/czy0729/Bangumi-Static/tree/master/data/h */
export const VERSION_HENTAI = '20210630'

/** @deprecated https://github.com/czy0729/Bangumi-Static/tree/master/data/tinygrail */
export const VERSION_TINYGRAIL = '20210720'

/** @deprecated https://github.com/czy0729/Bangumi-Game */
export const VERSION_GAME = '20220912'

/** @deprecated 头像历史版本, 用于用户历史头像, https://github.com/czy0729/Bangumi-OSS/tree/master/data/avatar/m */
export const VERSIONS_AVATAR = [
  '20211105',
  '20210915',
  '20210609',
  '20210410',
  '20201018',
  '20200502',
  '1.0.2'
]
