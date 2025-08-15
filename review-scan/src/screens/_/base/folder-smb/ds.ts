/*
 * @Author: czy0729
 * @Date: 2022-06-14 12:15:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:16:31
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'FolderSMB')

/** 文件类型排序 */
export const SORT_ORDER = {
  folder: 110,
  video: 100,
  music: 90,
  pic: 80,
  zip: 70,
  origin: 11,
  file: 10
}
