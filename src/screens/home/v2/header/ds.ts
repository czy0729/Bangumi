/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:29:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 19:07:23
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { MenuItem } from '@types'

export const COMPONENT = rc(PARENT, 'Header')

export const EVENT = {
  id: '首页.跳转'
} as const

/** 不参与跳转的菜单 key */
export const IGNORE_PATHS: MenuItem['key'][] = ['Open', 'Netabare', 'Link']
