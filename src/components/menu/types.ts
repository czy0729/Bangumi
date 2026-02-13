/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:02:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 21:15:06
 */
import type { ReactNode, WithViewStyles } from '@types'

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

export type Props = WithViewStyles<{
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
}>
