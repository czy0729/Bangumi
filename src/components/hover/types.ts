/*
 * @Author: czy0729
 * @Date: 2023-11-24 08:51:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 15:25:45
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  type?: '' | 'main' | 'warning' | 'primary' | 'desc'
  children: any
}>
