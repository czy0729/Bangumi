/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 00:32:31
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar } from '@screens/_'
import { getTimestamp, lastDate } from '@utils'
import _ from '@styles'
import { colorContainer, colorText, colorBorder } from '../styles'

function Item(
  {
    index,
    page,
    limit,
    avatar,
    userId,
    nickname,
    total,
    assets,
    principal,
    lastActiveDate,
    lastIndex
  },
  { navigation }
) {
  const isTop = index === 0
  let totalText
  if (total > 100000000) {
    totalText = `${(total / 100000000).toFixed(1)}亿`
  } else if (total > 1000) {
    totalText = `${(total / 10000).toFixed(1)}万`
  }

  let assetsText
  if (assets > 100000000) {
    assetsText = `${(assets / 100000000).toFixed(1)}亿`
  } else if (assets > 1000) {
    assetsText = `${(assets / 10000).toFixed(1)}万`
  }

  let principalText
  if (principal > 100000000) {
    principalText = `${(principal / 100000000).toFixed(1)}亿`
  } else if (principal > 1000) {
    principalText = `${(principal / 10000).toFixed(1)}万`
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
            src={avatar}
            size={44}
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
              <Touchable style={styles.item} highlight>
                <Flex>
                  <Flex.Item>
                    <Text size={16} type='plain'>
                      {rank}. {nickname}
                      {!!changeText && (
                        <Text
                          style={{
                            color: changeColor
                          }}
                          lineHeight={16}
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
                      余额{totalText} / 初始{principalText} /{' '}
                      {lastDate(getTimestamp(lastActiveDate.replace('T', ' ')))}
                    </Text>
                  </Flex.Item>
                  <Text size={16} type='plain'>
                    {assetsText}
                  </Text>
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
