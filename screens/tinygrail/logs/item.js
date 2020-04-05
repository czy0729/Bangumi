/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-06 03:04:05
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { lastDate, getTimestamp, formatNumber } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { observer } from '@utils/decorators'

function Item(
  { index, balance, desc, change, time, charaId },
  { $, navigation }
) {
  const styles = memoStyles()
  const { go } = $.state
  const isTop = index === 0
  let color
  if (change > 0) {
    color = _.colorBid
  } else if (change < 0) {
    color = _.colorAsk
  } else {
    color = _.colorTinygrailText
  }

  let onPress
  let icons
  if (['买入', '卖出', '交易', '混沌魔方'].some(item => desc.includes(item))) {
    // 这些类型有charaId
    icons = $.icons(charaId)
    onPress = getOnPress(charaId, go, navigation)
  } else if (['竞拍', 'ICO'].some(item => desc.includes(item))) {
    icons = $.icons(charaId)

    // 竞拍、ICO根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      onPress = getOnPress(match[0].replace('#', ''), go, navigation)
    }
  } else if (['刮刮乐获奖'].some(item => desc.includes(item))) {
    // 刮刮乐根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      const charaId = match[0].replace('#', '')
      icons = $.icons(charaId)
      onPress = getOnPress(charaId, go, navigation)
    }
  }

  let changeType
  let changeNum
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
      <Touchable onPress={onPress}>
        <Flex style={[styles.wrap, !isTop && styles.border]}>
          <Flex.Item style={_.mr.sm}>
            <View style={styles.item}>
              <Text type='tinygrailPlain' size={16}>
                {formatNumber(balance)}{' '}
                <Text type='tinygrailText' size={12} lineHeight={16}>
                  {' '}
                  {lastDate(getTimestamp((time || '').replace('T', ' ')))}
                </Text>
              </Text>
              <Flex style={_.mt.sm}>
                {!!icons && (
                  <Avatar
                    style={[styles.avatar, _.mr.sm]}
                    src={tinygrailOSS(icons)}
                    size={32}
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
                        monoId: `character/${charaId}`
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
                size={16}
                align='right'
              >
                {change
                  ? `${color === _.colorBid ? '+' : '-'}${formatNumber(
                      Math.abs(change)
                    )}`
                  : ''}
              </Text>
            ) : (
              <Text type={changeType} size={16} align='right'>
                {changeNum}
              </Text>
            )}
            {!!onPress && (
              <Iconfont
                style={_.ml.sm}
                size={14}
                name='right'
                color={_.colorTinygrailText}
              />
            )}
          </Flex>
        </Flex>
      </Touchable>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingRight: _.wind
  },
  item: {
    paddingVertical: _.md
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  }
}))

function getOnPress(charaId, go, navigation) {
  return () => {
    let to
    let params
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
