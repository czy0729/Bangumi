/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:48:43
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text } from '@components'
import { StatusBarPlaceholder } from '@_'
import { discoveryStore, userStore, useStore } from '@stores'
import { info } from '@utils'
import { useObserver } from '@utils/hooks'
import Award from '../component/award'
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
                  <Text size={12}>online {discoveryStore.online}</Text>
                  <Text
                    size={12}
                    onPress={() => {
                      info('已设置公开标识的在线人数')
                    }}
                  >
                    {' '}
                    ({Object.keys(userStore.state.onlines || {}).length})
                  </Text>
                </>
              )}
              <Flex.Item>
                <Text align='right' size={12} numberOfLines={1}>
                  {$.today || $.home.today}
                </Text>
              </Flex.Item>
            </Flex>

            <Today />
          </>
        )}
      </>
    )
  })
}

export default HeaderComponent
