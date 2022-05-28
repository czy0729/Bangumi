/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 08:48:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { memoStyles } from './styles'
import { ToolBarIconProps } from './types'

export const ToolBarIcon = observer(
  ({ icon, iconStyle, iconColor, onSelect }: ToolBarIconProps) => {
    const styles = memoStyles()
    return (
      <Touchable style={styles.touch} onPress={onSelect}>
        <Flex style={styles.item} justify='center'>
          {!!icon && (
            <Iconfont style={iconStyle} name={icon} size={17} color={iconColor} />
          )}
        </Flex>
      </Touchable>
    )
  }
)
