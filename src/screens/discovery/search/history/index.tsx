/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:41:42
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function History(props, { $ }: Ctx) {
  const { history, value } = $.state
  if (value !== '') return null

  const styles = memoStyles()
  return (
    <View style={_.mt.sm}>
      {history.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text size={15} bold onPress={() => $.selectHistory(item)}>
                {item}
              </Text>
            </Flex.Item>
            <Touchable style={styles.close} onPress={() => $.deleteHistory(item)}>
              <Iconfont name='md-close' />
            </Touchable>
          </Flex>
        </View>
      ))}
      <Heatmap right={52} id='搜索.选择历史' />
      <Heatmap id='搜索.删除历史' transparent />
    </View>
  )
}

export default obc(History)
