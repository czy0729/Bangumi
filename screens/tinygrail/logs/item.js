/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-14 05:24:41
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { lastDate, getTimestamp, formatNumber } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'

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
  if (
    (charaId && desc.includes('买入委托')) ||
    desc.includes('卖出委托') ||
    desc.includes('交易')
  ) {
    // 这些类型有charaId
    icons = $.icons(charaId)
    onPress = getOnPress(charaId, go, navigation)
  } else if (desc.includes('竞拍') || desc.includes('ICO')) {
    icons = $.icons(charaId)

    // 竞拍、ICO根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      onPress = getOnPress(match[0].replace('#', ''), go, navigation)
    }
  } else if (desc.includes('刮刮乐获奖')) {
    // 刮刮乐根据#id
    const match = desc.match(/#\d+/g)
    if (match) {
      const charaId = match[0].replace('#', '')
      icons = $.icons(charaId)
      onPress = getOnPress(charaId, go, navigation)
    }
  }

  return (
    <View style={styles.container}>
      <Touchable onPress={onPress}>
        <Flex style={[styles.wrap, !isTop && styles.border]}>
          <Flex.Item style={_.mr.sm}>
            <View style={styles.item}>
              <Text
                style={{
                  color: _.colorTinygrailPlain
                }}
                size={16}
              >
                {formatNumber(balance)}{' '}
                <Text
                  style={{
                    color: _.colorTinygrailText
                  }}
                  size={12}
                  lineHeight={16}
                >
                  {' '}
                  {lastDate(getTimestamp((time || '').replace('T', ' ')))}
                </Text>
              </Text>
              <Flex style={_.mt.sm}>
                {!!icons && (
                  <Avatar
                    style={_.mr.sm}
                    src={tinygrailOSS(icons)}
                    size={24}
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
                <Text
                  style={{
                    color: _.colorTinygrailPlain
                  }}
                  size={12}
                >
                  {desc}
                </Text>
              </Flex>
            </View>
          </Flex.Item>
          <Flex style={_.ml.md} justify='end'>
            <Text style={[_.ml.sm, { color }]} size={16} align='right'>
              {change
                ? `${color === _.colorBid ? '+' : '-'}${formatNumber(
                    Math.abs(change)
                  )}`
                : ''}
            </Text>
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
