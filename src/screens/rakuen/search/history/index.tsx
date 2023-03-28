/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:58:30
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function History({ style }, { $ }: Ctx) {
  const { history, value } = $.state
  if (value !== '') return null

  const styles = memoStyles()
  return (
    <View style={style}>
      {history.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={stl(styles.content, !_.flat && styles.border)}>
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
      <Heatmap right={52} id='帖子搜索.选择历史' />
      <Heatmap id='帖子搜索.删除历史' transparent />
    </View>
  )
}

export default obc(History)
