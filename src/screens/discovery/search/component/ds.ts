/*
 * @Author: czy0729
 * @Date: 2024-01-09 04:17:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 06:29:35
 *
 * 区块常量: 私有组件共享标识与列表配置
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Component')

/** 使用进场动画的最前项数 */
export const ENTERING_ANIMATIONS_NUM = 9

export const NO_LEGACY_DS = ['人物', '目录', '用户']
