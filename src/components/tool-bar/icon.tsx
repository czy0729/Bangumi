/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 14:02:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'
import { ToolBarIconProps } from './types'

export const ToolBarIcon = observer(
  ({ icon, iconStyle, iconColor, onSelect }: ToolBarIconProps) => {
    const styles = memoStyles()
    return (
      <Touchable style={styles.iconTouch} onPress={onSelect}>
        <Flex style={styles.iconItem} justify='center'>
          {!!icon && <Iconfont style={iconStyle} name={icon} size={17} color={iconColor} />}
        </Flex>
      </Touchable>
    )
  }
)
