/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 搜索历史: 关键字标签流
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function History() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { history, value } = $.state
  if (!history.length || value !== '') return null

  return (
    <View>
      <Flex style={styles.history} wrap='wrap'>
        {history.map(item => (
          <Flex key={item} style={styles.chip} align='center'>
            <Text size={14} onPress={() => $.selectHistory(item)}>
              {item}
            </Text>
            <Touchable style={styles.close} onPress={() => $.deleteHistory(item)}>
              <Iconfont name='md-close' size={14} />
            </Touchable>
          </Flex>
        ))}
      </Flex>

      <Heatmap id='帖子搜索.选择历史' />
      <Heatmap id='帖子搜索.删除历史' transparent />
    </View>
  )
}

export default observer(History)
