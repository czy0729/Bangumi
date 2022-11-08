/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 05:58:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, TextType } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { lastDate, getTimestamp, formatNumber, tinygrailOSS } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { AnyObject, ColorValue, MonoId, Navigation, Paths } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

const ITEMS = ['买入', '卖出', '交易', '混沌魔方'] as const
const ITEMS_2 = ['竞拍', 'ICO'] as const
const ITEMS_3 = ['刮刮乐获奖'] as const

function Item(
  { index, balance, desc = '', change, time, charaId }: Props,
  { $, navigation }: Ctx
) {
  const styles = memoStyles()
  const { go } = $.state
  const isTop = index === 0
  let color: ColorValue
  if (change > 0) {
    color = _.colorBid
  } else if (change < 0) {
    color = _.colorAsk
  } else {
    color = _.colorTinygrailText
  }

  let onPress
  let icons: string
  if (ITEMS.some(item => desc.includes(item))) {
    // 这些类型有charaId
    icons = $.icons(charaId)
    onPress = getOnPress(charaId, go, navigation)
  } else if (ITEMS_2.some(item => desc.includes(item))) {
    icons = $.icons(charaId)

    // 竞拍、ICO根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      onPress = getOnPress(match[0].replace('#', '') as MonoId, go, navigation)
    }
  } else if (ITEMS_3.some(item => desc.includes(item))) {
    // 刮刮乐根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      const charaId = match[0].replace('#', '') as MonoId
      icons = $.icons(charaId)
      onPress = getOnPress(charaId, go, navigation)
    }
  }

  let changeType: TextType
  let changeNum: string
  if (!change) {
    const match = desc.match(/\d+股/g)
    if (match && match.length) {
      if (['买入', '获得', '获奖'].some(item => desc.includes(item))) {
        changeType = 'bid'
        changeNum = `+${match[0].replace('股', '')}`
      } else {
        changeType = 'ask'
        changeNum = `-${match[0].replace('股', '')}`
      }
    }
  }

  return (
    <View style={styles.container}>
      <Touchable withoutFeedback={!onPress} onPress={onPress}>
        <Flex style={[styles.wrap, !isTop && !_.flat && styles.border]}>
          <Flex.Item style={_.mr.sm}>
            <View style={styles.item}>
              <Text type='tinygrailPlain' size={15} bold>
                {formatNumber(balance, 2, $.short)}{' '}
                <Text type='tinygrailText' size={11} lineHeight={15}>
                  {' '}
                  {lastDate(getTimestamp((time || '').replace('T', ' ')))}
                </Text>
              </Text>
              <Flex style={_.mt.sm}>
                {!!icons && (
                  <Avatar
                    style={[styles.avatar, _.mr.sm]}
                    src={tinygrailOSS(icons)}
                    size={28}
                    borderColor='transparent'
                    onPress={() => {
                      // ICO的记录没有人物id
                      if (!onPress) {
                        return
                      }

                      t('资金日志.跳转', {
                        to: 'Mono',
                        monoId: charaId
                      })

                      navigation.push('Mono', {
                        monoId: `character/${charaId}`,
                        _name: desc
                      })
                    }}
                  />
                )}
                <Text type='tinygrailPlain' size={12}>
                  {desc}
                </Text>
              </Flex>
            </View>
          </Flex.Item>
          <Flex style={_.ml.lg} justify='end'>
            {change ? (
              <Text
                style={{
                  color
                }}
                size={15}
                bold
                align='right'
              >
                {change
                  ? `${color === _.colorBid ? '+' : '-'}${formatNumber(
                      Math.abs(change),
                      2,
                      $.short
                    )}`
                  : ''}
              </Text>
            ) : (
              <Text type={changeType} size={15} bold align='right'>
                {changeNum}
              </Text>
            )}
            {!!onPress && (
              <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
            )}
          </Flex>
        </Flex>
      </Touchable>
    </View>
  )
}

export default obc(Item)

function getOnPress(charaId: MonoId, go: string, navigation: Navigation) {
  return () => {
    let to: Paths
    let params: AnyObject
    switch (go) {
      case 'K线':
        to = 'TinygrailTrade'
        break
      case '买入':
        to = 'TinygrailDeal'
        params = {
          type: 'bid'
        }
        break
      case '卖出':
        to = 'TinygrailDeal'
        params = {
          type: 'asks'
        }
        break
      case '资产重组':
        to = 'TinygrailSacrifice'
        break
      default:
        return
    }

    t('资金日志.跳转', {
      to,
      monoId: charaId
    })

    navigation.push(to, {
      monoId: `character/${charaId}`,
      ...params
    })
  }
}
