/*
 * @Author: czy0729
 * @Date: 2026-09-09 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 06:00:00
 */
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  /** 是否处于编辑 (键盘展开) 态, 收起态底部留白按 safe area 感知 */
  editing?: boolean
}>
