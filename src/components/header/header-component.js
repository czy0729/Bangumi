/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-23 01:31:17
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../flex'
import Back from './back'
import Transition from './transition'
import { colors } from './utils'

function HeaderComponent({
  navigation,
  y,
  fixed,
  title,
  statusBarEventsType,
  headerTitle,
  headerRight
}) {
  const styles = memoStyles()
  const color = colors[statusBarEventsType]
    ? colors[statusBarEventsType](fixed)
    : undefined
  return (
    <>
      <Flex style={styles.header}>
        <Transition y={y} fixed={fixed} title={title} headerTitle={headerTitle} />
        <Back navigation={navigation} color={color} />
        <Flex.Item />
        {!!headerRight && headerRight()}
      </Flex>
      <View style={styles.fixedLayout} />
    </>
  )
}

export default observer(HeaderComponent)

const memoStyles = _.memoStyles(() => ({
  fixedLayout: {
    marginTop: -2
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight,
    paddingRight: 6,
    paddingLeft: 5,
    marginTop: -2
  }
}))
