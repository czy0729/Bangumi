/*
 * @Author: czy0729
 * @Date: 2025-01-19 09:32:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 09:44:56
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Cover } from '../../../cover'
import { Flex } from '../../../flex'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import { memoStyles } from './styles'
import { Props } from './types'

function Mono({ text, cover, name, nameCn, onLinkPress }: Props) {
  const styles = memoStyles()

  /**
   * https://lain.bgm.tv/r/400/pic/crt/l/fc/77/114888_crt_hd3gG.jpg ->
   * https://lain.bgm.tv/pic/crt/g/fc/77/114888_crt_hd3gG.jpg
   */
  const gCover = cover.replace(/\/r\/\d+/g, '').replace(/\/(l|m)\//g, '/g/')
  const bottom = nameCn === text ? name : nameCn
  return (
    <View style={styles.wrap}>
      <Touchable animate onPress={onLinkPress}>
        <Flex style={styles.body}>
          <Cover src={gCover} size={48} radius />
          <View style={_.ml.sm}>
            <Text style={styles.top} size={11} bold numberOfLines={2}>
              {text}
            </Text>
            {bottom !== text && (
              <Flex style={_.mt.xs}>
                <Text style={styles.bottom} type='sub' size={10} bold numberOfLines={1}>
                  {bottom}
                </Text>
              </Flex>
            )}
          </View>
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Mono)
