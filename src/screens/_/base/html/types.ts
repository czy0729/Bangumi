/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:46:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-01 23:50:19
 */
import { RenderHtmlProps } from '@components'
import { EventType, Id, Navigation } from '@types'

export type Props = {
  navigation?: Navigation
  style?: RenderHtmlProps['style']
  id: Id
  msg: string
  url?: string
  imagesMaxWidth?: RenderHtmlProps['imagesMaxWidth']
  matchLink?: RenderHtmlProps['matchLink']
  event?: EventType
}
