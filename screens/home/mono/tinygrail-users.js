/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-15 13:38:31
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Divider } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'

function TinygrailUsers({ style }, { $, navigation }) {
  if (!$.tinygrail || !$.chara._loaded) {
    return null
  }

  const { total: amount } = $.chara
  const { list, total } = $.users
  return (
    <View style={style}>
      <Text type='warning' size={20}>
        董事会 10
        <Text type='desc' size={12} lineHeight={20}>
          {' '}
          / {total || '-'}
        </Text>
      </Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {list.map((item, index) => {
          const isTop = index === 0
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Flex key={index} style={styles.item}>
              <Avatar
                navigation={navigation}
                src={item.avatar}
                size={isTop ? 56 : 40}
                userId={item.name}
              />
              <Flex.Item style={_.ml.sm}>
                <Text type={isTop ? 'warning' : 'desc'} size={isTop ? 14 : 12}>
                  {item.nickName}
                </Text>
                <Text
                  style={_.mt.xs}
                  type={isTop ? 'warning' : 'sub'}
                  size={12}
                >
                  {item.balance ? `+${formatNumber(item.balance, 0)}` : '--'} (
                  {item.balance
                    ? toFixed((item.balance / amount) * 100, 2)
                    : '??'}
                  %)
                </Text>
              </Flex.Item>
            </Flex>
          )
        })}
      </Flex>
      <Divider />
    </View>
  )
}

TinygrailUsers.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(TinygrailUsers)

const styles = StyleSheet.create({
  item: {
    paddingVertical: _.sm,
    width: '50%'
  }
})
