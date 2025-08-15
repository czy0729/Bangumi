/*
 * @Author: czy0729
 * @Date: 2022-07-18 12:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:41:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Rakuen')

export const TEXTS = {
  rakuen: {
    hd: '超展开',
    information: '包括贴贴模块、用户绝交、屏蔽词管理'
  }
} as const
