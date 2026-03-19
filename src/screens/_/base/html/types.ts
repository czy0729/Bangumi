/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:46:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:02:47
 */
import type { ExpandProps, RenderHtmlProps } from '@components'
import type { EventType, Id, WithNavigation } from '@types'

export type Props = WithNavigation<{
  style?: RenderHtmlProps['style']
  ratio?: ExpandProps['ratio']
  msg: string
  length?: number
  imagesMaxWidth?: RenderHtmlProps['imagesMaxWidth']
  matchLink?: RenderHtmlProps['matchLink']
  id?: Id
  url?: string
  event?: EventType
}>
