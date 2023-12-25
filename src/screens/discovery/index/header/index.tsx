/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:25:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { StatusBarPlaceholder } from '@_'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Award from '../award'
import Today from '../today'
import SortMenu from '../sort-menu'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Header(props, { $ }: Ctx) {
  rerender('Discovery.Header')

  const styles = memoStyles()
  const { dragging } = $.state
  const { today } = $.home
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
