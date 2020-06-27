/*
 * @Author: czy0729
 * @Date: 2019-09-20 21:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 13:06:26
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Flex } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { Avatar } from '@screens/_'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'

function Initial({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { users } = $.chara
  const { list } = $.initial
  const { username } = $.userInfo
  const event = {
    id: 'ICO交易.跳转'
  }
  return (
    <View style={[styles.container, style]}>
      <Text type='tinygrailPlain' size={12} lineHeight={16}>
        <Text type='warning' size={16}>
          参与者 {users}
        </Text>{' '}
        / 15
      </Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {list.map((item, index) => {
          const isTop = index === 0
          const isMe = username === item.name
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Flex key={index} style={styles.item}>
              <Avatar
                style={styles.avatar}
                navigation={navigation}
                src={tinygrailOSS(item.avatar)}
                size={isTop ? 56 : 40}
                userId={item.name}
                name={item.nickName}
                borderColor='transparent'
                event={event}
              />
              <Flex.Item style={_.ml.sm}>
                <Text
                  type={isTop || isMe ? 'warning' : 'tinygrailPlain'}
                  size={isTop ? 14 : 12}
                  bold
                >
                  {item.nickName}
                </Text>
                <Text
                  style={_.mt.xs}
                  type={
                    isTop ? 'warning' : item.amount ? 'bid' : 'tinygrailText'
                  }
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    paddingVertical: _.sm,
    width: '50%'
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
