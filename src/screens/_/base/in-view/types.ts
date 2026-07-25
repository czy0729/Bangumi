/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 20:28:57
 */
import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'
import type { DeepPartial, Override } from '@types'
import type { computeInViewY } from './utils'

export type Props = Override<
  ViewProps,
  {
    index?: number
    y?: number
    log?: boolean
    flex?: boolean
  }
>

/** InView 内部组件的 Props, 包含从 store 注入的 visibleBottom */
export type InnerProps = Omit<ViewProps, 'children'> & {
  index?: number
  y?: number
  log?: boolean
  flex?: boolean
  visibleBottom: number
  children?: ReactNode
}

export type InViewComponentType = {
  (props: Props): JSX.Element
  y: typeof computeInViewY
}

export type Ctx = DeepPartial<{
  $: {
    state: {
      visibleBottom: number
    }
  }
}>
