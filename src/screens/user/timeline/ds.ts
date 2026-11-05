/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:27:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线: 页面标识与默认查询条件
 */
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'

export const COMPONENT = 'UserTimeline'

/** 默认范围: 自己 */
export const DEFAULT_SCOPE = MODEL_TIMELINE_SCOPE.getValue('自己')

/** 默认类型: 收藏 */
export const DEFAULT_TYPE = MODEL_TIMELINE_TYPE.getValue('收藏')
