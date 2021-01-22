/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:32:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Award from './award'
import Menu from './menu'

function Header(props, { $ }) {
  const styles = memoStyles()
  const { today } = $.home
  return (
    <View style={styles.container}>
      <StatusBarPlaceholder />
      <View>
        <Award />
        <Heatmap
          id='发现.跳转'
          data={{
            to: 'Award'
          }}
        />
      </View>
      <Menu />
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
    </View>
  )
}

export default obc(Header)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingBottom: _.sm
  },
  wrap: {
    ..._.container.wind,
    ..._.mt.lg
  }
}))
