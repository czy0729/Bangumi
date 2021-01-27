/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:21:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber, toFixed, getTimestamp } from '@utils'
import { obc } from '@utils/decorators'

const event = {
  id: '资产重组.跳转',
  data: {
    from: '董事会'
  }
}
const params = {
  from: 'tinygrail'
}

function Users({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { showUsers } = $.state
  const { total: amount } = $.chara
  const { list, total } = $.users
  return (
    <View style={[_.container.inner, style]}>
      <Text type='tinygrailText' size={13} lineHeight={17}>
        董事会{' '}
        <Text type='warning' size={17}>
          {total || '-'}
        </Text>
      </Text>
      {showUsers && (
        <Flex style={_.mt.sm} wrap='wrap'>
          {list.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Flex key={index} style={styles.item}>
              <UserStatus
                style={styles.userStatus}
                last={getTimestamp(
                  (item.lastActiveDate || '').replace('T', ' ')
                )}
              >
                <Avatar
                  style={styles.avatar}
                  navigation={navigation}
                  src={item.avatar}
                  size={32}
                  userId={item.name}
                  name={item.nickName}
                  event={event}
                  params={params}
                />
              </UserStatus>
              <Flex.Item style={_.ml.sm}>
                <Flex style={!!item.balance && _.mt.xs}>
                  <Text type='tinygrailPlain' size={12} bold numberOfLines={1}>
                    {item.nickName}
                  </Text>
                  {item.lastIndex !== 0 && (
                    <Text style={styles.rank} type='ask' size={9} bold>
                      #{item.lastIndex}
                    </Text>
                  )}
                </Flex>
                {!!item.balance && (
                  <Text type='tinygrailText' size={11} lineHeight={13}>
                    +{formatNumber(item.balance, 0)}{' '}
                    {toFixed((item.balance / amount) * 100, 2)}%
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          ))}
        </Flex>
      )}
      <Flex style={_.mt.md} justify='center'>
        <Text
          style={styles.expand}
          type='tinygrailText'
          size={14}
          onPress={$.toggleUsers}
        >
          [{showUsers ? '隐藏' : '显示'}董事会]
        </Text>
      </Flex>
    </View>
  )
}

export default obc(Users)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: _.sm,
    width: '50%'
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  expand: {
    paddingVertical: _.sm
  },
  rank: {
    marginTop: -2,
    marginLeft: 2
  }
}))
