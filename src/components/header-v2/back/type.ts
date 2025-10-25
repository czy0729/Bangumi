/*
 * @Author: czy0729
 * @Date: 2023-12-04 14:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:29:22
 */
import type { ColorValue, WithViewStyles } from '@types'
import type { TouchableProps } from '../../touchable'

export type Props = WithViewStyles<{
  /** 箭头颜色 */
  color?: ColorValue

  /** 点击回调 */
  onPress?: TouchableProps['onPress']
}>
