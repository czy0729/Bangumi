/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 19:22:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SHARE_MODE } from '@constants'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { colors } from '../styles'
import { memoStyles } from './styles'
import { Props } from './types'

function HeaderComponent({
  navigation,
  fixed,
  title,
  statusBarEventsType,
  headerTitle,
  headerLeft,
  headerRight
}: Props) {
  const styles = memoStyles()
  const color = colors[statusBarEventsType]
    ? colors[statusBarEventsType](fixed)
    : undefined
  return (
    <Flex style={styles.header}>
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Back navigation={navigation} color={color} />
      {headerLeft}
      <Flex.Item />
      {!!headerRight && !SHARE_MODE && headerRight()}
    </Flex>
  )
}

export default observer(HeaderComponent)
