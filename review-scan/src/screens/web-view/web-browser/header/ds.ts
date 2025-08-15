/*
 * @Author: czy0729
 * @Date: 2025-08-08 19:15:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-08 19:15:46
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['web-browser', 'WebBrowser'] as const
