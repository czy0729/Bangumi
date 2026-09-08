/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:14:36
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function History({ style }) {
  const { $ } = useStore<Ctx>(COMPONENT)
  if ($.state.value !== '') return null

  const styles = memoStyles()

  return (
    <View style={style}>
      {$.state.history.map(item => (
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
      <Heatmap right={52} id='帖子搜索.选择历史' />
      <Heatmap id='帖子搜索.删除历史' transparent />
    </View>
  )
}

export default observer(History)
