/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 07:18:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { tinygrailLastDate } from '@tinygrail/_/utils'
import { Fn, MonoId } from '@types'
import { Ctx } from '../../types'
import Avatar from './avatar'
import Change from './change'
import { getOnPress } from './utils'
import { COMPONENT, ITEMS } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ balance, desc = '', change, time, charaId }: Props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { go } = $.state

  let onPress: Fn
  let icons: string
  if (ITEMS.some(item => desc.includes(item))) {
    // 这些类型有 charaId
    icons = $.icons(charaId)
    onPress = getOnPress(charaId, go, navigation)
  } else {
    // 竞拍、ICO 根据 #id
    const match = desc.match(/#\d+/g)
    if (match) {
      const charaId = match[0].replace('#', '') as MonoId
      if (charaId) {
        icons = $.icons(charaId)
        onPress = getOnPress(charaId, go, navigation)
      }
    }
  }

  return (
    <Touchable style={styles.container} withoutFeedback={!onPress} onPress={onPress}>
      <Flex style={styles.wrap}>
        <Flex.Item style={_.mr.sm}>
          <View style={styles.item}>
            <Text type='tinygrailPlain' size={15} bold>
              {formatNumber(balance, 2, systemStore.setting.xsbShort)}{' '}
              <Text type='tinygrailText' size={11} lineHeight={15}>
                {' '}
                {tinygrailLastDate(time)}
              </Text>
            </Text>
            <Flex style={_.mt.sm}>
              <Avatar charaId={charaId} icons={icons} desc={desc} onPress={onPress} />
              <Flex.Item>
                <Text type='tinygrailPlain' size={12}>
                  {desc}
                </Text>
              </Flex.Item>
            </Flex>
          </View>
        </Flex.Item>
        <Change desc={desc} change={change} />
        {!!onPress && (
          <Iconfont style={_.mr._sm} name='md-navigate-next' color={_.colorTinygrailText} />
        )}
      </Flex>
    </Touchable>
  )
}

export default obc(Item, COMPONENT)
