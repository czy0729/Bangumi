/*
 * @Author: czy0729
 * @Date: 2023-06-01 01:25:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:09:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Component } from '../../component'
import { colors } from '../styles'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

/** component-header */
function HeaderComponent({
  navigation,
  fixed,
  mode,
  title,
  statusBarEventsType,
  headerTitle,
  headerLeft,
  headerRight,
  onBackPress
}: Props) {
  r(COMPONENT)

  const styles = memoStyles()
  const color = colors[statusBarEventsType] ? colors[statusBarEventsType](fixed) : undefined
  return (
    <Component
      id='component-header'
      data-mode={mode || 'normal'}
      style={{
        ...styles.header,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Back navigation={navigation} color={color} onPress={onBackPress} />
      {headerLeft}
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Component>
  )
}

export default observer(HeaderComponent)
