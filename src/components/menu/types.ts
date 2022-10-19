/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:02:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 14:02:13
 */
import { ViewStyle, ReactNode } from '@types'

type TitleItemType =
  | string
  | {
      type?: string
      title: ReactNode
      disabled?: boolean
    }

type DataItemType =
  | string
  | {
      type?: string
      title?: string
    }

export type Props = {
  style?: ViewStyle
  title?: TitleItemType[]
  data?: DataItemType[]
  onSelect?: (title?: string) => any
}
