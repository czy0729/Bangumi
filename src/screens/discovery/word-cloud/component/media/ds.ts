/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 06:58:34
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Media')

/** WEB 媒体头点击跳转: ID 参数键 → 路由名 */
export const WEB_ROUTE_MAP = {
  subjectId: 'Subject',
  topicId: 'Topic',
  monoId: 'Mono',
  userId: 'Zone'
} as const
