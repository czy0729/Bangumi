/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:43:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 13:44:11
 */
import { TextProps } from 'react-native'
import { Override } from '@types'

export type Props = Override<
  TextProps,
  {
    end: number
  }
>
