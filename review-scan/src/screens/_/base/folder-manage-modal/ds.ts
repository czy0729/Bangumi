/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-18 17:24:15
 */
import { rc } from '@utils/dev'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'FolderManageModal')

export const STORAGE_KEY_EXPAND = 'FolderManageModal|expand'

export const STORAGE_KEY_SORT = 'FolderManageModal|sort'

export const STORAGE_KEY_ORDER = 'FolderManageModal|order'

export const WIDTH = Math.floor(IMG_WIDTH_SM * 0.76)

export const HEIGHT = Math.floor(IMG_HEIGHT_SM * 0.76)

export const CONTROL_DS = {
  root: ['修改', '删除'],
  single: ['修改', '移出'],
  top: ['修改', '下移', '置底', '移出'],
  middle: ['修改', '置顶', '上移', '下移', '置底', '移出'],
  bottom: ['修改', '置顶', '上移', '移出']
} as const

export const SORT_DS = [
  {
    label: '时间',
    value: 'date'
  },
  {
    label: '名字',
    value: 'name'
  },
  {
    label: '数量',
    value: 'count'
  }
] as const

export const ORDER_DS = [
  {
    label: '倒序',
    value: 'desc'
  },
  {
    label: '顺序',
    value: 'asc'
  }
] as const
