/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:10:41
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text } from '@components'
import { StatusBarPlaceholder } from '@_'
import { obc } from '@utils/decorators'
import Award from '../component/award'
import SortMenu from '../component/sort-menu'
import Today from '../component/today'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function HeaderComponent(props, { $ }: Ctx) {
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

export default obc(HeaderComponent, COMPONENT)
