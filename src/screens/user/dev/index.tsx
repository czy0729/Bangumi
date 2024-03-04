/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 17:33:00
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Header, ScrollView } from '@components'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Base from './base'
import Detail from './detail'
import ScreenOrientation from './screen-orientation'
import UpdateAdvance from './update-advance'
import UpdateKey from './update-key'
import UpdateTourist from './update-tourist'
import UsersAdvance from './users-advance'
import { memoStyles } from './styles'

const DEV = ({ navigation }: NavigationProps) => {
  // useRunAfter(() => {
  //   initXsbRelationOTA()
  // })

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
