/*
 * @Author: czy0729
 * @Date: 2026-09-28 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 23:00:00
 *
 * 板块右侧更多入口
 */
import type { EventData } from '@utils/track/type'
import type { EventKeys } from '@types'

export type Props = {
  /** 埋点事件 (板块 ds 的 EVENT) */
  event: {
    id: EventKeys
    data: EventData
  }

  /** 文案 */
  text: string

  /** 目标页面 (Works / Voices 路由参数一致) */
  to: 'Works' | 'Voices'
}
