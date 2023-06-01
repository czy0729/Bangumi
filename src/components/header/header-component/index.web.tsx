/*
 * @Author: czy0729
 * @Date: 2023-06-01 01:25:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-01 01:33:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { colors } from '../styles'
import { memoStyles } from './styles'
import { Props } from './types'

function HeaderComponent({
  navigation,
  fixed,
  mode,
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
    <header
      className={`component-header component-header--${mode || 'normal'}`}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.header,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Back navigation={navigation} color={color} />
      {headerLeft}
      <Flex.Item />
      {!!headerRight && headerRight()}
    </header>
  )
}

export default observer(HeaderComponent)
