/*
 * @Author: czy0729
 * @Date: 2024-02-29 23:57:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 23:18:25
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['user/timeline', 'UserTimeline'] as const
