/*
 * @Author: czy0729
 * @Date: 2026-01-18 17:07:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 11:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Props } from './types'

const configs = {
  BilibiliSync: { key: 'bilibili', size: 20, altKey: 'bilibili_0' },
  DoubanSync: { key: 'dou', size: 19, altKey: 'dou_0' },
  Smb: { key: 'samba', size: 36, altKey: 'samba_0' },
  Wiki: { key: 'wiki', size: 21, altKey: 'wiki_0' },
  WordCloud: { key: 'wordcloud', size: 19, altKey: 'wordcloud_0' },
  Yearbook: { key: 'book', size: 20, altKey: 'book_0' }
} as const

type ImageConfig = (typeof configs)[keyof typeof configs]

export const COMPONENT = rc(PARENT, 'IconMenu')

export const IMAGE_CONFIG: Partial<Record<Props['id'], ImageConfig>> = configs
