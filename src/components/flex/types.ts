/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:41:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 11:07:25
 */
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { Override } from '@types'

export type Props = Override<
  FlexPropsType,
  {
    flex?: number
  }
>
