/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 16:50:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { colors } from '../styles'
import { memoStyles } from './styles'
import { Props } from './types'

/** component-header */
function HeaderComponent({
  navigation,
  fixed,
  title,
  statusBarEventsType,
  headerTitle,
  headerLeft,
  headerRight,
  onBackPress
}: Props) {
  const styles = memoStyles()
  const color = colors[statusBarEventsType]
    ? colors[statusBarEventsType](fixed)
    : undefined
  return (
    <Flex style={styles.header}>
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Back navigation={navigation} color={color} onPress={onBackPress} />
      {headerLeft}
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(HeaderComponent)
