/*
 * @Author: czy0729
 * @Date: 2019-09-20 21:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 01:21:57
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Flex } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { Avatar } from '@screens/_'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'

function Initial({ style }, { $, navigation }) {
  const { users } = $.chara
  const { list } = $.initial
  const { username } = $.userInfo
  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          color: _.colorTinygrailPlain
        }}
        size={12}
        lineHeight={16}
      >
        <Text type='warning' size={16}>
          参与者 {users}
        </Text>{' '}
        / 10
      </Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {list.map((item, index) => {
          const isTop = index === 0
          const isMe = username === item.name
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Flex key={index} style={styles.item}>
              <Avatar
                navigation={navigation}
                src={tinygrailOSS(item.avatar)}
                size={isTop ? 56 : 40}
                userId={item.name}
                name={item.nickName}
                borderColor='transparent'
              />
              <Flex.Item style={_.ml.sm}>
                <Text
                  style={{
                    color:
                      isTop || isMe ? _.colorWarning : _.colorTinygrailPlain
                  }}
                  size={isTop ? 14 : 12}
                >
                  {item.nickName}
                </Text>
                <Text
                  style={[
                    _.mt.xs,
                    {
                      color: isTop
                        ? _.colorWarning
                        : item.amount
                        ? _.colorBid
                        : _.colorTinygrailText
                    }
                  ]}
                  size={12}
                >
                  +{item.amount ? formatNumber(item.amount, 0) : '???'}
                </Text>
              </Flex.Item>
            </Flex>
          )
        })}
      </Flex>
    </View>
  )
}

Initial.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Initial)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    paddingVertical: _.sm,
    width: '50%'
  }
})
