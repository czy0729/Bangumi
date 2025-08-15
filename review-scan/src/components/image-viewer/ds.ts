/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:28:27
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ImageViewer')

export const ACTION_SHEET_DS = ['浏览器打开图片', '取消'] as const
