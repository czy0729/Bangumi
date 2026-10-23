/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:29:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 角色条目懒加载入口
 */
import { lazy } from 'react'

export const ItemVoice = lazy(() => import('./index'))
export type { Props as ItemVoiceProps } from './types'
