/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 10:55:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Expand, Navigation } from '@types'
import { Flex } from '../flex'
import Back from './back'
import Transition from './transition'
import { colors } from './styles'
import { HeaderProps } from './types'

type Props = Expand<
  {
    navigation: Navigation
  } & Pick<
    HeaderProps,
    'fixed' | 'title' | 'statusBarEventsType' | 'headerTitle' | 'headerRight'
  >
>

function HeaderComponent({
  navigation,
  fixed,
  title,
  statusBarEventsType,
  headerTitle,
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
      <Flex.Item />
      {!!headerRight && headerRight()}
    </Flex>
  )
}

export default observer(HeaderComponent)

const memoStyles = _.memoStyles(() => ({
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight,
    paddingRight: 6,
    paddingLeft: 5
  }
}))
