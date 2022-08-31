/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:07:00
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Header } from '@components'
import { _, userStore } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import { initXsbRelationOTA } from '@constants/cdn'
import { NavigationProps } from '@types'
import Base from './base'
import ScreenOrientation from './screen-orientation'
import UpdateTourist from './update-tourist'
import UpdateAdvance from './update-advance'
import UsersAdvance from './users-advance'
import Detail from './detail'
import { memoStyles } from './styles'

const DEV = ({ navigation }: NavigationProps) => {
  useRunAfter(() => {
    initXsbRelationOTA()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
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
              </>
            )}
          </View>
          <Detail />
        </ScrollView>
      </>
    )
  })
}

export default DEV
