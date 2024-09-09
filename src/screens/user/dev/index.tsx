/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:16:53
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Header, ScrollView } from '@components'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Base from './components/base'
import Detail from './components/detail'
import ScreenOrientation from './components/screen-orientation'
import UpdateAdvance from './components/update-advance'
import UpdateKey from './components/update-key'
import UpdateTourist from './components/update-tourist'
// import UsersAdvance from './components/users-advance'
import { memoStyles } from './styles'

const DEV = ({ navigation }: NavigationProps) => {
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
            <Base navigation={navigation} />
            <ScreenOrientation />
            {userStore.isDeveloper && (
              <>
                <UpdateTourist />
                <UpdateAdvance navigation={navigation} />
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
