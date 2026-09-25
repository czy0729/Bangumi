/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  /** 列表中的索引, 用于计算懒加载行号 */
  index: number
}>
