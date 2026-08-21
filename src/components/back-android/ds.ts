/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 04:33:13
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'BackAndroid')

/** 两次退后间隔阈值（毫秒），用于「再按一次退出」 */
export const EXIT_THRESHOLD = 2000
