/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 02:05:55
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { StatusBarPlaceholder } from '@_'
import { obc } from '@utils/decorators'
import Award from '../award'
import Today from '../today'
import SortMenu from '../sort-menu'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Header(props, { $, navigation }: Ctx) {
  // global.rerender('Discovery.Header')

  const styles = memoStyles()
  const { dragging } = $.state
  const { today } = $.home
  return (
    <>
      <StatusBarPlaceholder />
      {!dragging && (
        <View>
          <Award navigation={navigation} />
          <Heatmap id='发现.跳转' to='Award' />
        </View>
      )}
      <SortMenu />
      {!dragging && (
        <>
          <Flex style={styles.wrap}>
            {!!$.online && (
              <Text align='right' size={12}>
                online {$.online}
              </Text>
            )}
            <Flex.Item>
              <Text align='right' size={12} numberOfLines={1}>
                {$.today || today}
              </Text>
            </Flex.Item>
          </Flex>
          <Today />
        </>
      )}
    </>
  )
}

export default obc(Header)
