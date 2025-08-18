/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:02:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 05:08:57
 */
import { ReactNode, ViewStyle } from '@types'

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
  desc?: string
  data?: DataItemType[] | readonly DataItemType[]
  onSelect?: (
    title?: string,
    index?: number,
    evt?: {
      pageX?: number
      pageY?: number
    }
  ) => any
}
