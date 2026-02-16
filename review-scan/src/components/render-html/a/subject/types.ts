/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:37:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:38:58
 */
import { Fn } from '@types'

export type Props = {
  text?: string
  href?: string
  image?: string
  name?: string
  name_cn?: string
  rating?: {
    score?: number
    total?: number
  }
  rank?: number | ''
  air_date?: string
  onLinkPress?: Fn
}
