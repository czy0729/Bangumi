/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:04:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 16:50:08
 */
import { Expand, Fn, Navigation, ReactNode } from '@types'
import { Props as HeaderProps } from '../types'

export type Props = Expand<
  {
    navigation: Navigation
  } & Pick<
    HeaderProps,
    'fixed' | 'mode' | 'title' | 'statusBarEventsType' | 'headerTitle' | 'headerRight'
  > & {
      headerLeft?: ReactNode
      onBackPress?: Fn
    }
>
