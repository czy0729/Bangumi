/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:59:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:55:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, Stars } from '@screens/_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { obc } from '@utils/decorators'

const event = {
  id: '用户评分.跳转'
}

function Item({ id, avatar, name, time, star, comment }, { navigation }) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Flex>
        <Avatar
          navigation={navigation}
          event={event}
          userId={id}
          size={32}
          src={avatar}
          border
          radius
          shadow
        />
        <Flex.Item style={_.ml.sm}>
          <Text size={12} bold>
            {name}
            <Text size={10} lineHeight={12} type='sub'>
              {' '}
              {simpleTime(time).split(' ')[0]}
            </Text>
          </Text>
          {!!star && <Stars style={_.mt.xxs} value={star} size={11} />}
        </Flex.Item>
      </Flex>
      {!!comment && (
        <Flex>
          <Text style={styles.comment} size={13} lineHeight={16}>
            {comment}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    width: '50%',
    paddingVertical: _.sm + 2
  },
  comment: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginTop: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
