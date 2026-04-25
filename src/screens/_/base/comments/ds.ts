/*
 * @Author: czy0729
 * @Date: 2026-04-25 14:49:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 14:49:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Comments')

export const REG_SPLIT = /(?!\/(?:[A-Za-z0-9]{1,2}\/)+)(?:\s*\/\s*)+/g
