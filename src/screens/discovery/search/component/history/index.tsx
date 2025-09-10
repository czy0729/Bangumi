/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 10:32:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function History() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { history } = $.state
    if (!history.length || $.state.value !== '') return null

    const styles = memoStyles()
    return (
      <View style={_.mt.sm}>
        {history.map(item => (
          <View key={item} style={styles.item}>
            <Flex>
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
        {!!history.length && (
          <View style={styles.clear}>
            <Text type='sub' size={15} bold onPress={$.deleteHistoryAll}>
              清除历史
            </Text>
          </View>
        )}
        <Heatmap right={52} id='搜索.选择历史' />
        <Heatmap id='搜索.删除历史' transparent />
      </View>
    )
  })
}

export default History
