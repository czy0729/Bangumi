/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:28:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'

import type { ToolBarIconProps } from './types'

function ToolBarIcon({ icon, iconStyle, iconColor, onSelect }: ToolBarIconProps) {
  const styles = memoStyles()

  return (
    <Touchable style={styles.iconTouch} onPress={onSelect}>
      <Flex style={styles.iconItem} justify='center'>
        {!!icon && (
          <View style={iconStyle}>
            <Iconfont name={icon} size={19} color={iconColor} />
          </View>
        )}
      </Flex>
    </Touchable>
  )
}

export default observer(ToolBarIcon)
