/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 11:12:14
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_BROWSER = '浏览器查看'

export const DATA = [TEXT_BROWSER] as const
