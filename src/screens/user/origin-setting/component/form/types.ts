/*
 * @Author: czy0729
 * @Date: 2026-03-03 11:39:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 11:42:42
 */
import type { InputProps } from '@components'
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  name: string
  url: string
  isBase?: boolean
  onScrollIntoViewIfNeeded: InputProps['onScrollIntoViewIfNeeded']
}>
