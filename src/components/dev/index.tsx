/*
 * 开发用：主动热更新按钮
 * @Author: czy0729
 * @Date: 2022-03-30 20:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 15:08:58
 */
import React from 'react'
import { View, DevSettings } from 'react-native'
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx'
import { _ } from '@stores'
import { date, getTimestamp } from '@utils'
import { DEV as dev, IOS } from '@constants'
import { ScrollView } from '../scroll-view'
import { Flex } from '../flex'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { Text } from '../text'
import { memoStyles } from './styles'

const logs = observable([])

// let interval: number

/** 调试窗口打印 (手机实机开发用) */
export function devLog(...args: any) {
  if (!DEV) return

  setTimeout(() => {
    runInAction(() => {
      args.reverse().forEach(data => {
        logs.unshift({
          date: date('H:i:s', getTimestamp()),
          data: typeof data === 'object' ? JSON.stringify(data, null, 4) : String(data)
        })
      })

      // if (interval) {
      //   clearInterval(interval)
      //   interval = null
      // } else {
      //   interval = setInterval(() => {
      //     runInAction(() => {
      //       logs.clear()
      //     })
      //   }, 10000)
      // }
    })
  }, 0)
}

export const DEV = observer(() => {
  if (!dev) return null

  const styles = memoStyles()
  return (
    <>
      {!!logs.length && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          {logs.map((item, index) => (
            <Flex key={`${index}|${item.date}`} style={_.mb.sm} align='start'>
              <Text type='sub' size={10} lineHeight={13}>
                {item.date}
              </Text>
              <Flex.Item style={_.ml.sm}>
                <Text size={12} lineHeight={13} bold selectable>
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
    </>
  )
})
