/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:24:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:41:31
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/ico', 'TinygrailICO'] as const
