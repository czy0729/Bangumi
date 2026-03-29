/*
 * @Author: czy0729
 * @Date: 2025-09-05 09:57:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-30 07:15:58
 */
import { BGM_EMOJIS_GROUP_DATA } from '../ds'
import {
  BGM_MAP_CATFISH_BLAKE,
  BGM_MAP_CATFISH_DESC,
  BGM_MAP_CATFISH_MUSUME,
  BGM_MAP_CINNAMOR,
  BGM_MAP_DSM,
  BGM_MAP_VICKSCARLET,
  BGM_MAP_WUHANG
} from '../../bgm-text'

export const BGM_EMOJIS_DATA = [
  {
    title: 'Cinnamor',
    data: BGM_MAP_CINNAMOR,
    desc: null
  },
  {
    title: '神戸小鳥',
    data: BGM_MAP_VICKSCARLET,
    desc: null
  },
  {
    title: '五行行行行行啊',
    data: BGM_MAP_WUHANG,
    desc: null
  },
  {
    title: 'dsm',
    data: BGM_MAP_DSM,
    desc: null
  }
] as const

export const BGM_EMOJIS_MUSUME_DATA = [
  {
    title: '貓魚ↀѡↀ',
    data: BGM_MAP_CATFISH_MUSUME,
    desc: BGM_MAP_CATFISH_DESC
  }
] as const

export const BGM_EMOJIS_BLAKE_DATA = [
  {
    title: '貓魚ↀѡↀ',
    data: BGM_MAP_CATFISH_BLAKE,
    desc: BGM_MAP_CATFISH_DESC
  }
] as const

export const BGM_EMOJIS_MAP = {
  [BGM_EMOJIS_GROUP_DATA[0]]: BGM_EMOJIS_DATA,
  [BGM_EMOJIS_GROUP_DATA[1]]: BGM_EMOJIS_MUSUME_DATA,
  [BGM_EMOJIS_GROUP_DATA[2]]: BGM_EMOJIS_BLAKE_DATA
} as const
