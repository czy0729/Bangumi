/*
 * @Author: czy0729
 * @Date: 2024-01-12 15:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 16:45:50
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Params } from './types'

export const COMPONENT = rc(PARENT, 'Form')

export const PARAMS: Params = [
  { key: 'https://', label: '　', insert: true },
  { key: 'www', label: '　', insert: true },
  { key: '.', label: '　', insert: true },
  { key: 'com', label: '　', insert: true },
  { key: '/', label: '　', insert: true },
  { key: '?', label: '　', insert: true },
  { key: '=', label: '　', insert: true },
  { key: '&', label: '　', insert: true },
  { key: 'CN', label: '条目中文名' },
  { key: 'JP', label: '日文名' },
  { key: 'CN_S2T', label: '中文繁体名' },
  { key: 'TIME', label: '时间戳' },
  { key: 'ID', label: '条目ID' },
  { key: 'ARTIST', label: '作者名' },
  { key: 'ALBUM', label: '专辑名' },
  { key: 'YEAR', label: '年份' },
  { key: 'RELATED_ANIME', label: '关联动画' }
] as const
