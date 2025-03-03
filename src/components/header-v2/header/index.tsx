/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:17:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Flex } from '../../flex'
import { Text } from '../../text'
import Back from '../back'
import Background from '../background'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Header({ style, transparent, title, headerRight, headerTitleAlign, headerTitleStyle }) {
  r(COMPONENT)

  const styles = memoStyles()
  return (
    <Flex style={styles.header}>
      <Background style={stl(style, transparent && styles.transparent)} />
      {!transparent && (
        <Flex
          style={stl(styles.title, headerTitleStyle)}
          justify={headerTitleAlign === 'left' ? 'start' : 'center'}
        >
          <Text style={styles.titleText} size={16} numberOfLines={1}>
            {title}
          </Text>
        </Flex>
      )}
      <Back />
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(Header)
