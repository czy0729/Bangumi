/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 04:21:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { StatusBarPlaceholder } from '@_'
import { discoveryStore, userStore, useStore } from '@stores'
import { feedback, info } from '@utils'
import { useObserver } from '@utils/hooks'
import Award from '../component/award'
import Live2DMenu from '../component/live-2d-menu'
import SortMenu from '../component/sort-menu'
import Today from '../component/today'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'

function HeaderComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { dragging } = $.state
    const length = Object.keys(userStore.state.onlines || {}).length

    return (
      <>
        <StatusBarPlaceholder />

        {!dragging && (
          <View>
            <Award />
            <Heatmap id='发现.跳转' to='Award' />
          </View>
        )}

        <SortMenu />

        {!dragging && (
          <>
            <Flex style={styles.wrap}>
              {!!discoveryStore.online && (
                <>
                  <Text style={styles.compact} size={12}>
                    online {discoveryStore.online}
                  </Text>
                  {!!length && (
                    <Touchable
                      style={styles.badge}
                      onPress={() => {
                        info('客户端最近公开的在线人数')
                        feedback(true)
                      }}
                    >
                      <Text type='sub' size={11} bold>
                        {length}
                      </Text>
                    </Touchable>
                  )}
                </>
              )}

              <Flex.Item>
                <Text style={styles.compact} align='right' size={12} numberOfLines={1}>
                  {$.today || $.home.today}
                </Text>
              </Flex.Item>

              <Live2DMenu />
            </Flex>

            <Today />
          </>
        )}
      </>
    )
  })
}

export default HeaderComponent
