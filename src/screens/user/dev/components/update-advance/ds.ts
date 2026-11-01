/*
 * @Author: czy0729
 * @Date: 2025-02-28 14:27:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 无偿额度维护工具标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'UpdateAdvance')

/** 支付方式选项 */
export const PAYTYPE_DS = ['微信', '支付宝'] as const
