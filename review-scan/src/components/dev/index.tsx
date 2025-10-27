/*
 * @Author: czy0729
 * @Date: 2022-03-30 20:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:28:23
 */
import React from 'react'
import { DevSettings, View } from 'react-native'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { syncSystemStore } from '@utils/async'
import { DEV as dev, IOS } from '@constants'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { devLog, devLogLimit, devLogs, logs } from './utils'
import { memoStyles } from './styles'

export { devLog, devLogs, devLogLimit }

/** [DEV] 主动热更新按钮 */
export const DEV = observer(() => {
  if (!dev && !syncSystemStore().state.dev) return null

  const styles = memoStyles()
  return (
    <>
      {!!logs.length && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          {logs.map((item, index) => (
            <Flex key={`${index}|${item.date}`} style={_.mb.sm} align='start'>
              <Text type='sub' size={12} lineHeight={14}>
                {item.date.slice(3, 8)}
              </Text>
              <Flex.Item style={_.ml.sm}>
                <Text type='__plain__' size={12} lineHeight={14} selectable>
                  {item.data}
                </Text>
              </Flex.Item>
            </Flex>
          ))}
        </ScrollView>
      )}
      {!IOS && (
        <View style={styles.dev}>
          <Touchable style={styles.touch} onPress={() => DevSettings.reload()}>
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='md-refresh' color={_.colorPlain} size={20} />
            </Flex>
          </Touchable>
        </View>
      )}
      {!!logs.length && (
        <View style={styles.clear}>
          <Touchable
            style={styles.clearTouch}
            onPress={() => {
              runInAction(() => {
                logs.clear()
              })
            }}
          >
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='md-close' color={_.__colorPlain__} size={20} />
            </Flex>
          </Touchable>
        </View>
      )}
    </>
  )
})

export default DEV
