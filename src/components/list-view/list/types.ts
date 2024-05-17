/*
 * @Author: czy0729
 * @Date: 2023-08-11 17:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 11:40:19
 */
import { Fn, ListEmpty, Override } from '@types'
import { Props as ListViewProps } from '../types'

export type ListProps<ItemT> = Override<
  ListViewProps<ItemT>,
  {
    connectRef?: Fn
    data?: ItemT[]
  }
>

export type PassProps = {
  ref?: Fn
  data?: ListEmpty
  sections?: any

  /** https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12#overscroll-effect */
  overScrollMode: 'never' | 'always'

  /** https://reactnative.dev/docs/scrollview#alwaysbouncehorizontal-ios */
  alwaysBounceHorizontal: false

  /** https://reactnative.dev/docs/scrollview#alwaysbouncevertical-ios */
  alwaysBounceVertical: false
  removeClippedSubviews: boolean
}
