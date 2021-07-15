/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-15 18:39:47
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Mesume, Heatmap } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { correctAgo } from '@utils/app'
import { obc } from '@utils/decorators'

function List({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { list, _loaded } = $.reviews
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume />
        <Text style={_.mt.sm} type='sub'>
          好像什么都没有
        </Text>
      </Flex>
    )
  }

  return (
    <View style={style}>
      {list.map(
        ({ id, title, replies, time, avatar, userId, userName }, index) => (
          <Touchable
            key={id}
            style={styles.item}
            onPress={() =>
              navigation.push('Blog', {
                blogId: id
              })
            }
          >
            <Flex
              style={[styles.wrap, !!index && !_.flat && styles.border]}
              align='start'
            >
              <Avatar
                style={_.mr.sm}
                navigation={navigation}
                userId={userId}
                name={userName}
                src={avatar}
              />
              <Flex.Item>
                <Text size={15}>
                  {title}
                  {replies !== '+0' && (
                    <Text type='main' size={12} lineHeight={15} bold>
                      {' '}
                      {replies}
                    </Text>
                  )}
                </Text>
                <Text style={_.mt.sm} type='sub' size={12}>
                  {correctAgo(time)} /{' '}
                  <Text size={12} bold>
                    {userName}
                  </Text>
                </Text>
                {!index && <Heatmap id='讨论版.跳转' />}
              </Flex.Item>
            </Flex>
          </Touchable>
        )
      )}
    </View>
  )
}

export default obc(List)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind + _.md
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  readed: {
    backgroundColor: _.colorBg
  },
  empty: {
    minHeight: 240
  }
}))
