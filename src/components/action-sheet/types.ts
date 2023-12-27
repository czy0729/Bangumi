/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:15:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 13:15:42
 */
import { PropsWithChildren } from 'react'
import { ReactNode } from '@types'

export type Props = PropsWithChildren<{
  /** 是否显示 */
  show?: boolean

  /** 高度，不会超过屏幕高度的 88% */
  height?: number

  /** 标题 */
  title?: string | ReactNode

  /** 关闭回调函数 */
  onClose?: () => any
}>
