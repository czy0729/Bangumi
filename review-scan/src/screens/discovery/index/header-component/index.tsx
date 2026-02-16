/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:17:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text } from '@components'
import { StatusBarPlaceholder } from '@_'
import { discoveryStore, userStore, useStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import Award from '../component/award'
import SortMenu from '../component/sort-menu'
import Today from '../component/today'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function HeaderComponent() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const clientOnlines = Object.keys(userStore.state.onlines).length
  return (
    <>
      <StatusBarPlaceholder />
      {!$.state.dragging && (
        <View>
          <Award />
          <Heatmap id='发现.跳转' to='Award' />
        </View>
      )}
      <SortMenu />
      {!$.state.dragging && (
        <>
          <Flex style={styles.wrap}>
            {!!discoveryStore.online && (
              <>
                <Text size={12}>online {discoveryStore.online}</Text>
                {clientOnlines > 10 && (
                  <Text
                    size={12}
                    onPress={() => {
                      info('已设置公开标识的在线人数')
                    }}
                  >
                    {' '}
                    ({clientOnlines})
                  </Text>
                )}
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
}

export default ob(HeaderComponent, COMPONENT)
