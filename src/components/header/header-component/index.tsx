/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 16:18:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { STORYBOOK } from '@constants'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import Placeholder from '../placeholder'
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
    <>
      <Flex style={styles.header}>
        <Transition
          fixed={fixed || STORYBOOK}
          title={title}
          headerTitle={headerTitle}
        />
        <Back navigation={navigation} color={color} />
        {headerLeft}
        <Flex.Item />
        {!!headerRight && headerRight()}
      </Flex>
      {STORYBOOK && <Placeholder />}
    </>
  )
}

export default observer(HeaderComponent)
