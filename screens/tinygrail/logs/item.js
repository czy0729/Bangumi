/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 16:44:03
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

function Item(
  { index, balance, desc, change, time, charaId },
  { $, navigation }
) {
  const styles = memoStyles()
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
  if (
    (charaId && desc.includes('买入委托')) ||
    desc.includes('卖出委托') ||
    desc.includes('交易')
  ) {
    onPress = () =>
      navigation.push('TinygrailTrade', {
        monoId: `character/${charaId}`
      })
  }

  // @notice 刮刮乐的id有问题, 不显示头像
  const icons = !desc.includes('刮刮乐') && $.icons(charaId)

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
          <Flex style={[styles.change, _.ml.md]} justify='end'>
            <Text style={[_.ml.sm, { color }]} size={16} align='right'>
              {color === _.colorBid ? '+' : '-'}
              {formatNumber(Math.abs(change))}
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
  },
  change: {
    minWidth: 120
  }
}))
