/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 00:14:45
 */
import React from 'react'
import { ScrollView, Header } from '@components'
import { _, userStore } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import { initXsbRelationOTA } from '@constants/cdn'
import Base from './base'
import ScreenOrientation from './screen-orientation'
import UpdateTourist from './update-tourist'
import UpdateAdvance from './update-advance'
import UsersAdvance from './users-advance'
import Detail from './detail'

const DEV = ({ navigation }) => {
  useRunAfter(() => {
    initXsbRelationOTA()
  })

  return useObserver(() => (
    <>
      <Header title='开发菜单' hm={['dev', 'DEV']} />
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        {userStore.isDeveloper && <Base navigation={navigation} />}
        <ScreenOrientation />
        {userStore.isDeveloper && (
          <>
            <UpdateTourist navigation={navigation} />
            <UpdateAdvance navigation={navigation} />
            <UsersAdvance navigation={navigation} />
          </>
        )}
        <Detail />
      </ScrollView>
    </>
  ))
}

export default DEV
