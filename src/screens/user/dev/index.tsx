/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 04:37:10
 */
import React from 'react'
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

const DEV = ({ navigation }: NavigationProps) => {
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
        {userStore.isDeveloper && <Base />}
        <ScreenOrientation />
        {userStore.isDeveloper && (
          <>
            <UpdateTourist />
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
