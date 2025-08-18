/*
 * @Author: czy0729
 * @Date: 2024-03-04 19:01:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 19:01:48
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Btns')

export const DATA_MORE = ['重新授权', '粘贴板', '意见反馈', '设置'] as const
