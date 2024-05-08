/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:56:03
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'StatusBtnGroup')

export const SPRING_CONFIG = {
  /** 阻尼系数，值越大，回弹越快 */
  damping: 20,

  /** 弹簧刚度，值越大，回弹越快 */
  stiffness: 200
} as const
