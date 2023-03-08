/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 18:58:24
 */
import { _ } from '@stores'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

export const STORAGE_KEY = 'FolderManageModal|expand'

export const WIDTH = _.r(IMG_WIDTH / 1.5)

export const HEIGHT = _.r(IMG_HEIGHT / 1.5)

export const CONTROL_DS = {
  root: ['修改', '删除'],
  single: ['修改', '移出'],
  top: ['修改', '下移', '置底', '移出'],
  middle: ['修改', '置顶', '上移', '下移', '置底', '移出'],
  bottom: ['修改', '置顶', '上移', '移出']
} as const
