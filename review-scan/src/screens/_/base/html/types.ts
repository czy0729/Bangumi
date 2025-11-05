/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:46:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 05:45:35
 */
import { ExpandProps, RenderHtmlProps } from '@components'
import { EventType, Id, Navigation } from '@types'

export type Props = {
  navigation?: Navigation
  style?: RenderHtmlProps['style']
  ratio?: ExpandProps['ratio']
  msg: string
  length?: number
  imagesMaxWidth?: RenderHtmlProps['imagesMaxWidth']
  matchLink?: RenderHtmlProps['matchLink']
  id?: Id
  url?: string
  event?: EventType
}
