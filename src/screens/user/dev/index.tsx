/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:36:18
 */
import React from 'react'
import { View } from 'react-native'
import { Component, HeaderPlaceholder, HeaderV2, ScrollView } from '@components'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Base from './components/base'
import Detail from './components/detail'
import ScreenOrientation from './components/screen-orientation'
import UpdateAdvance from './components/update-advance'
import UpdateKey from './components/update-key'
import UpdateTourist from './components/update-tourist'
import { useDEVPage } from './hooks'
import { HM } from './ds'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 开发调试工具 */
const DEV = ({ navigation }: NavigationProps) => {
  const { handleForwardRef, handleScrollTo } = useDEVPage()

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-dev'>
        <HeaderPlaceholder />
        <ScrollView
          forwardRef={handleForwardRef}
          style={_.container.plain}
          contentContainerStyle={_.container.bottom}
        >
          <View style={styles.container}>
            <Base navigation={navigation} />
            <ScreenOrientation />
            {userStore.isDeveloper && (
              <>
                <UpdateAdvance navigation={navigation} onScrollTo={handleScrollTo} />
                <UpdateTourist />
                <UpdateKey />
              </>
            )}
          </View>
          <Detail />
        </ScrollView>
        <HeaderV2 title='开发菜单' hm={HM} />
      </Component>
    )
  })
}

export default DEV
