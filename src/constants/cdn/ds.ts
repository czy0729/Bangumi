/*
 * jsDelivr 国内待废弃
 *
 * @Author: czy0729
 * @Date: 2022-05-23 04:40:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-14 16:45:53
 */
import { get } from '@utils/crypto'

/** @deprecated cdn | fastly | gcore | originfastly */
export const HOST_CDN_FASTLY = 'https://fastly.jsdelivr.net'

/** @deprecated OneDrive */
export const HOST_CDN_ONEDRIVE = 'https://bangumi.stdcdn.com'

/** @deprecated OneDrive Static File */
export const HOST_CDN_STATIC = 'https://bangumi-static.stdcdn.com'

/** DogeCloud */
export const HOST_DOGE = get(
  'U2FsdGVkX1/PXY2zMa9hDyRFAFjsZXNSzJvNrxUaQ3gBWUMfsMwK2psySTo4/gKoeTo2WcMavXPewMdpH0G+AA=='
) as string

export const HOST_CDN_AVATAR = get(
  'U2FsdGVkX19B9z0TLPcopsUYzdq1hhviuF8j4ZjtcA+ho5Zr2/GAfv31rFzztvUJ'
) as string

/** https://github.com/czy0729/Bangumi-Static */
export const VERSION_STATIC = '20220306'

/** https://github.com/czy0729/Bangumi-Rakuen */
export const VERSION_RAKUEN = '20220223'

/** https://github.com/czy0729/Bangumi-OSS/tree/master/data/avatar/m */
export const VERSION_AVATAR = '20220102'

/** https://github.com/czy0729/Bangumi-OSS/tree/master/data/subject/c */
export const VERSION_OSS = '20220103'

/** https://github.com/czy0729/Bangumi-Subject */
export const VERSION_SUBJECT = '20220102'

/** https://github.com/czy0729/Bangumi-Mono */
export const VERSION_MONO = '20201216'

/** https://github.com/czy0729/Bangumi-Static/tree/master/data/agefans */
export const VERSION_ANIME = '20220223'

/** https://github.com/czy0729/Bangumi-Static/tree/master/data/wenku8 */
export const VERSION_WENKU = '20210627'

/** https://github.com/czy0729/Bangumi-Static/tree/master/data/manhuadb */
export const VERSION_MANGA = '20210628'

/** https://github.com/czy0729/Bangumi-Static/tree/master/data/h */
export const VERSION_HENTAI = '20210630'

/** https://github.com/czy0729/Bangumi-Static/tree/master/data/tinygrail */
export const VERSION_TINYGRAIL = '20210720'

/** https://github.com/czy0729/Bangumi-Game */
export const VERSION_GAME = '20220327'

/** 头像历史版本, 用于用户历史头像, https://github.com/czy0729/Bangumi-OSS/tree/master/data/avatar/m */
export const VERSIONS_AVATAR = [
  '20211105',
  '20210915',
  '20210609',
  '20210410',
  '20201018',
  '20200502',
  '1.0.2'
]
