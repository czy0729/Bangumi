/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:47:13
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { tinygrailLastDate } from '@tinygrail/_/utils'
import { Fn, MonoId } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Avatar from './avatar'
import Change from './change'
import { getOnPress, insertNewlineBeforeSecondBracket } from './utils'
import { COMPONENT, ITEMS } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ balance, desc = '', change, time, charaId }: Props) {
  const { $, navigation } = useStore<Ctx>()

  const { page } = $.state
  if (TABS[page].title === '道具') {
    const { itemsType } = $.state
    if (itemsType && itemsType !== '全部' && !desc.includes(itemsType)) return null
  }

  const styles = memoStyles()
  let icons: string
  let handlePress: Fn
  if (ITEMS.some(item => desc.includes(item))) {
    // 这些类型有 charaId
    icons = $.icons(charaId)
    handlePress = getOnPress(charaId, $.state.go, navigation)
  } else {
    // 竞拍、ICO 根据 #id
    const match = desc.match(/#\d+/g)
    if (match) {
      const charaId = match[0].replace('#', '') as MonoId
      if (charaId) {
        icons = $.icons(charaId)
        handlePress = getOnPress(charaId, $.state.go, navigation)
      }
    }
  }

  return (
    <Touchable style={styles.container} withoutFeedback={!handlePress} onPress={handlePress}>
      <Flex style={styles.wrap}>
        <Flex.Item style={_.mr.sm}>
          <View style={styles.item}>
            <Text type='tinygrailPlain' size={15} bold>
              {formatNumber(balance, 2, systemStore.setting.xsbShort)}{' '}
              <Text type='tinygrailText' size={12} lineHeight={15}>
                {' '}
                {tinygrailLastDate(time)}
              </Text>
            </Text>
            <Flex style={_.mt.sm}>
              <Avatar charaId={charaId} icons={icons} onPress={handlePress} />
              <Flex.Item>
                <Text type='tinygrailPlain' size={12} lineHeight={14}>
                  {insertNewlineBeforeSecondBracket(desc)}
                </Text>
              </Flex.Item>
            </Flex>
          </View>
        </Flex.Item>
        <Change desc={desc} change={change} />
        {!!handlePress && (
          <Iconfont style={_.mr._sm} name='md-navigate-next' color={_.colorTinygrailText} />
        )}
      </Flex>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
