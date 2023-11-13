/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:15:25
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Header, Component } from '@components'
import { _, userStore } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import { initXsbRelationOTA } from '@constants/cdn'
import { NavigationProps } from '@types'
import Base from './base'
import ScreenOrientation from './screen-orientation'
import UpdateTourist from './update-tourist'
import UpdateAdvance from './update-advance'
import UsersAdvance from './users-advance'
import UpdateKey from './update-key'
import Detail from './detail'
import { memoStyles } from './styles'

const DEV = ({ navigation }: NavigationProps) => {
  useRunAfter(() => {
    initXsbRelationOTA()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-dev'>
        <Header title='开发菜单' hm={['dev', 'DEV']} />
        <ScrollView
          style={_.container.plain}
          contentContainerStyle={_.container.bottom}
          scrollToTop
        >
          <View style={styles.container}>
            <Base />
            <ScreenOrientation />
            {userStore.isDeveloper && (
              <>
                <UpdateTourist />
                <UpdateAdvance navigation={navigation} />
                <UsersAdvance navigation={navigation} />
                <UpdateKey />
              </>
            )}
          </View>
          <Detail />
        </ScrollView>
      </Component>
    )
  })
}

export default DEV
