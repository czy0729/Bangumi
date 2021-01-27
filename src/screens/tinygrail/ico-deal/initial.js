/*
 * @Author: czy0729
 * @Date: 2019-09-20 21:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:14:36
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { Avatar } from '@screens/_'
import { tinygrailOSS } from '@utils/app'
import { obc } from '@utils/decorators'

function Initial({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { users } = $.chara
  const { list } = $.initial
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
        {list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={index} style={styles.item}>
            <Avatar
              style={styles.avatar}
              navigation={navigation}
              src={tinygrailOSS(item.avatar)}
              size={32}
              userId={item.name}
              name={item.nickName}
              borderColor='transparent'
              event={event}
            />
            <Flex.Item style={_.ml.sm}>
              <Flex>
                <Text type='tinygrailPlain' size={12} bold numberOfLines={1}>
                  {item.nickName}
                </Text>
                {item.lastIndex !== 0 && (
                  <Text style={styles.rank} type='ask' size={9} bold>
                    #{item.lastIndex}
                  </Text>
                )}
              </Flex>
              {!!item.amount && (
                <Text type='tinygrailText' size={11} lineHeight={13}>
                  +{formatNumber(item.amount, 0, $.short)}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        ))}
      </Flex>
    </View>
  )
}

export default obc(Initial)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    width: '47%',
    paddingVertical: _.sm,
    paddingRight: _.md,
    marginRight: '3%'
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    marginTop: -2,
    marginLeft: 2
  }
}))
