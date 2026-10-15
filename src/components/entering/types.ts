/*
 * @Author: czy0729
 * @Date: 2026-10-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 00:00:00
 */
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  /** 列表序号 */
  index: number

  /** 使用进场动画的最前项数 */
  num: number
}>
