/*
 * @Author: czy0729
 * @Date: 2026-03-07 05:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-07 05:30:01
 */
import type { BBCodeConfig } from './types'

export const BBCODE_CONFIG: Record<string, BBCodeConfig> = {
  b: {
    insert: '[b]$TEXT$[/b]',
    offset: 3
  },
  i: {
    insert: '[i]$TEXT$[/i]',
    offset: 3
  },
  u: {
    insert: '[u]$TEXT$[/u]',
    offset: 3
  },
  s: {
    insert: '[s]$TEXT$[/s]',
    offset: 3
  },
  url: {
    insert: '[url=]$TEXT$[/url]',
    offset: 5
  },
  img: {
    insert: '[img]$TEXT$[/img]',
    offset: 5
  },
  quote: {
    insert: '[quote]$TEXT$[/quote]',
    offset: 7
  },
  mask: {
    insert: '[mask]$TEXT$[/mask]',
    offset: 6
  }
}
