/*
 * @Author: czy0729
 * @Date: 2024-05-06 13:38:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 列表标识与常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 本地分页每页条数 */
export const LIMIT_LIST = 12
