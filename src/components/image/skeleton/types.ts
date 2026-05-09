/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:30:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 18:31:16
 */
import type { ImageSource } from '@types'
import type { ImageStyle as RNImageStyle } from 'react-native'
import type { SkeletonProps as ParentSkeletonProps } from '../../skeleton'

export type Props = {
  style?: RNImageStyle
  uri?: ImageSource | string
  type?: ParentSkeletonProps['type']
  textOnly?: boolean
  placeholder?: boolean
  loaded?: boolean
}
