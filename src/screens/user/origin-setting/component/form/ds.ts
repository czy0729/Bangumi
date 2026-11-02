/*
 * @Author: czy0729
 * @Date: 2024-01-12 15:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 组件标识、可插入参数与参数说明文字属性
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { TextProps } from '@components'
import type { Params } from './types'

export const COMPONENT = rc(PARENT, 'Form')

/** 参数说明文字属性 */
export const TEXT_PROPS: TextProps = {
  size: 10,
  lineHeight: 11,
  bold: true
}

const PARAMS: Params = [
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
  { key: 'RELATED_ANIME', label: '关联动画' },
  { key: 'CN_DECODE', label: '中文 (不转码)' },
  { key: 'JP_DECODE', label: '日文 (不转码)' },
  { key: 'ARTIST_DECODE', label: '作者 (不转码)' },
  { key: 'ALBUM_DECODE', label: '专辑 (不转码)' }
]

/** 原样插入的符号参数 */
export const PARAMS_TEXT = PARAMS.filter(item => item.insert)

/** 以 [KEY] 形式插入的变量参数 */
export const PARAMS_KEY = PARAMS.filter(item => !item.insert)
