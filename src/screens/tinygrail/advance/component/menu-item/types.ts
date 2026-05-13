/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:38:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:42:18
 */
import type { IconfontNames, Paths, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    pathname: Paths
    title: string
    icon: IconfontNames
  }>
>
