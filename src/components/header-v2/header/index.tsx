/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 15:44:16
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Flex } from '../../flex'
import { Text } from '../../text'
import Back from '../back'
import Background from '../background'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Header({
  style,
  transparent,
  title,
  headerTitleAlign,
  headerTitleStyle,
  headerTitleSize = 16,
  headerTitleAppend,
  headerRight
}: Props) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Flex style={styles.header}>
        <Background style={stl(style, transparent && styles.transparent)} />
        {!transparent && (
          <Flex
            style={stl(styles.title, headerTitleStyle)}
            justify={headerTitleAlign === 'left' ? 'start' : 'center'}
          >
            <Text style={styles.titleText} size={headerTitleSize} numberOfLines={1}>
              {title}
            </Text>
            {!!headerTitleAppend && <View style={styles.titleAppend}>{headerTitleAppend}</View>}
          </Flex>
        )}
        <Back />
        <Flex.Item />
        {!!headerRight && headerRight()}
      </Flex>
    )
  })
}

export default Header
