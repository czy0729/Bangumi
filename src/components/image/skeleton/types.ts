/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:30:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 18:31:16
 */
import type { ImageSource, ViewStyle } from '@types'
import type { SkeletonProps as ParentSkeletonProps } from '../../skeleton'
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'textOnly' | 'placeholder'> & {
  style?: ViewStyle
  uri?: ImageSource | string
  type?: ParentSkeletonProps['type']
  loaded?: boolean
}
