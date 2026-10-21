/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:10:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 11:10:22
 *
 * 评分列表组件标识与条目高度估算
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 单条评分的估算高度 (头像 + 名称 + 星级 + 可选短评) */
export const ITEM_HEIGHT = 56
