/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:53:16
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ColorValue, IconfontNames, ViewStyle } from '@types'

type Props = {
  style?: ViewStyle
  size?: number
  name?: IconfontNames
  color?: ColorValue
  children?: any
  onPress?: (event?: any) => any
}

export const IconHeader = ob(
  ({ style, size = 20, name, color = _.colorTitle, onPress, children }: Props) => (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont size={size} name={name} color={color} />
      {children}
    </Touchable>
  )
)

const styles = _.create({
  icon: {
    padding: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
})
