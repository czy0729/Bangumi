/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 18:59:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Type')

export const DATA = ['简介', '详情'] as const
