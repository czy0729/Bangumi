/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 20:05:12
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import { formatNumber, getTimestamp, lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import _ from '@styles'
import { colorContainer, colorText, colorBorder } from '../styles'

const B = 100000000
const M = 10000

function Item(
  {
    index,
    page,
    limit,
    avatar,
    userId,
    nickname,
    total,
    share,
    assets,
    principal,
    lastActiveDate,
    lastIndex
  },
  { navigation }
) {
  const isTop = index === 0
  let totalText
  if (Math.abs(total) > B) {
    totalText = `${formatNumber(total / B, 1)}亿`
  } else if (Math.abs(total) > M) {
    totalText = `${formatNumber(total / M, 1)}万`
  } else {
    totalText = formatNumber(Math.abs(total), 1)
  }

  let assetsText
  if (assets > B) {
    assetsText = `${formatNumber(assets / B, 1)}亿`
  } else if (assets > M) {
    assetsText = `${formatNumber(assets / M, 1)}万`
  } else {
    assetsText = assets
  }

  let principalText
  if (principal > B) {
    principalText = `${formatNumber(principal / B, 1)}亿`
  } else if (principal > M) {
    principalText = `${formatNumber(principal / M, 1)}万`
  } else {
    principalText = principal
  }

  let shareText
  if (share > M) {
    shareText = `${formatNumber(share / M, 1)}万`
  } else {
    shareText = share
  }

  const rank = index + 1 + (page - 1) * limit
  let changeText = ''
  let changeColor
  if (lastIndex === 0) {
    changeText = 'new'
    changeColor = _.colorWarning
  } else {
    const change = lastIndex - rank
    if (change < 0) {
      changeText = change
      changeColor = _.colorAsk
    } else if (change > 0) {
      changeText = `+${change}`
      changeColor = _.colorBid
    }
  }

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <View>
          <Avatar
            style={styles.image}
            src={tinygrailOSS(avatar)}
            size={44}
            borderColor='transparent'
            onPress={() =>
              navigation.push('Zone', {
                userId
              })
            }
          />
        </View>
        <Flex.Item style={!isTop && styles.border}>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                highlight
                onPress={() =>
                  navigation.push('TinygrailTree', {
                    userName: userId,
                    name: nickname
                  })
                }
              >
                <Flex>
                  <Flex.Item>
                    <Text size={16} type='plain'>
                      {rank}. {nickname}
                      {!!changeText && (
                        <Text
                          style={{
                            color: changeColor
                          }}
                          size={16}
                        >
                          {' '}
                          {changeText}
                        </Text>
                      )}
                    </Text>
                    <Text
                      style={[
                        _.mt.sm,
                        {
                          color: colorText
                        }
                      ]}
                      size={12}
                    >
                      总{assetsText} / 余{totalText} / 初{principalText} /{' '}
                      {lastActiveDate
                        ? lastDate(
                            getTimestamp(lastActiveDate.replace('T', ' '))
                          )
                        : '-'}
                    </Text>
                  </Flex.Item>
                  <Text size={16} type='plain'>
                    {shareText}
                  </Text>
                  <Iconfont
                    style={_.ml.sm}
                    size={14}
                    name='right'
                    color={colorText}
                  />
                </Flex>
              </Touchable>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: colorContainer
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  bonus: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: _.colorWarning,
    overflow: 'hidden'
  }
})
