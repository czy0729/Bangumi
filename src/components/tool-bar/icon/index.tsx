/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:20
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function ToolBarIcon({ icon, iconStyle, iconSize = 19, iconColor, onSelect }: Props) {
  const styles = memoStyles()

  return (
    <Touchable style={styles.iconTouch} onPress={onSelect}>
      <Flex style={styles.iconItem} justify='center'>
        {!!icon && (
          <View style={iconStyle}>
            <Iconfont name={icon} size={iconSize} color={iconColor} />
          </View>
        )}
      </Flex>
    </Touchable>
  )
}

export default observer(ToolBarIcon)
