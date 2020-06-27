/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 14:02:35
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'

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
          {list.map((item, index) => {
            const isTop = index === 0
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Flex key={index} style={styles.item}>
                <Avatar
                  style={styles.avatar}
                  navigation={navigation}
                  src={item.avatar}
                  size={isTop ? 56 : 40}
                  userId={item.name}
                  name={item.nickName}
                  event={event}
                  params={params}
                />
                <Flex.Item style={_.ml.sm}>
                  <Text
                    type={isTop ? 'warning' : 'tinygrailPlain'}
                    size={isTop ? 14 : 12}
                    bold
                    numberOfLines={1}
                  >
                    {item.lastIndex !== 0 && (
                      <Text type='ask' size={isTop ? 14 : 12}>
                        #{item.lastIndex}{' '}
                      </Text>
                    )}
                    {item.nickName}
                  </Text>
                  <Text
                    style={_.mt.xs}
                    type={isTop ? 'warning' : 'tinygrailText'}
                    size={12}
                  >
                    {item.balance ? `+${formatNumber(item.balance, 0)}` : ''}{' '}
                    {item.balance
                      ? toFixed((item.balance / amount) * 100, 2)
                      : '??'}
                    %
                  </Text>
                </Flex.Item>
              </Flex>
            )
          })}
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

Users.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Users)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: _.sm,
    width: '50%'
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  expand: {
    paddingVertical: _.sm
  }
}))
