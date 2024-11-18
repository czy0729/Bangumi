/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:32:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:59:01
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DEV, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import Lock from '../lock'
import U from '../u'
import Content from './content'
import Service from './service'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function About() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <Animated.ScrollView
      nestedScrollEnabled
      contentContainerStyle={styles.nestScroll}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      <View style={styles.page}>
        <Lock />
        <Service />
        <Content />
        {!DEV && userStore.isDeveloper && !!$.usersInfo.username && <U />}
      </View>
    </Animated.ScrollView>
  )
}

export default ob(About, COMPONENT)
