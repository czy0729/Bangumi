/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:03:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-23 05:38:15
 */
import { SDK } from '../index'
import {
  HOST_CDN,
  VERSION_STATIC,
  VERSION_ANIME,
  VERSION_WENKU,
  VERSION_MANGA,
  VERSION_HENTAI
} from './ds'
import { getVersion } from './utils'

const HOST_STATIC = `${HOST_CDN}/gh/czy0729/Bangumi-Static`

/** 发现首页 */
export const CDN_DISCOVERY_HOME = () => {
  const v = getVersion('VERSION_STATIC', VERSION_STATIC)
  return `${HOST_STATIC}@${v}/data/discovery/home.json`
}

/** 找番剧数据 */
export const CDN_STATIC_ANIME = () => {
  const v = getVersion('VERSION_ANIME', VERSION_ANIME)
  return `${HOST_STATIC}@${v}/data/agefans/anime.min.json`
}

/** 找文库数据 */
export const CDN_STATIC_WENKU = () => {
  const v = getVersion('VERSION_WENKU', VERSION_WENKU)
  return `${HOST_STATIC}@${v}/data/wenku8/wenku.min.json`
}

/** 找漫画数据 */
export const CDN_STATIC_MANGA = () => {
  const v = getVersion('VERSION_MANGA', VERSION_MANGA)
  return `${HOST_STATIC}@${v}/data/manhuadb/manga.min.json`
}

/** 找 Hentai 数据 */
export const CDN_STATIC_HENTAI = () => {
  const v = getVersion('VERSION_HENTAI', VERSION_HENTAI)
  return `${HOST_STATIC}@${v}/data/h/hentai.min.json`
}

/** 年鉴 */
export const CDN_AWARD = (year: string | number) => {
  const v = getVersion('VERSION_STATIC', VERSION_STATIC)
  const prefix = SDK >= 36 ? '.expo' : ''
  return `${HOST_STATIC}@${v}/data/award/${year}${prefix}.json`
}
