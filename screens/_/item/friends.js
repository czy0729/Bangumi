/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 18:36:52
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Progress } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import _ from '@styles'
import Avatar from '../base/avatar'

function ItemFriends({
  navigation,
  avatar,
  userId,
  userName,
  hobby,
  percent,
  recent,
  doing,
  collect,
  wish,
  onHold,
  dropped
}) {
  return (
    <Touchable
      style={styles.container}
      highlight
      onPress={() =>
        navigation.push('Zone', {
          userId
        })
      }
    >
      <Flex>
        <Avatar style={styles.image} size={48} src={avatar} />
        <Flex.Item style={[styles.item, _.ml.md]}>
          <Flex>
            <Flex.Item>
              <Text>{userName}</Text>
            </Flex.Item>
            <Text size={12}>{recent}</Text>
          </Flex>
          <Text style={_.mt.md} size={10} type='sub'>
            {!!doing && `${doing}在看`}
            {!!collect && `${doing ? ' / ' : ''}${collect}看过`}
            {!!wish && ` / ${wish}想看`}
            {!!onHold && ` / ${onHold}搁置`}
            {!!dropped && ` / ${dropped}抛弃`}
          </Text>
          <Progress
            style={styles.progress}
            barStyle={styles.bar}
            percent={percent}
          />
        </Flex.Item>
        <Text style={styles.hobby} size={12} type='sub'>
          {hobby || '-'} / {percent || '-'}%
        </Text>
      </Flex>
    </Touchable>
  )
}

export default observer(ItemFriends)

const styles = StyleSheet.create({
  container: {
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.xs,
    marginLeft: _.wind
  },
  item: {
    paddingTop: _.md,
    paddingRight: _.wind,
    paddingBottom: _.sm
  },
  progress: {
    position: 'absolute',
    right: '24%',
    bottom: 0,
    left: 0,
    backgroundColor: _.colorBg
  },
  bar: {
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  hobby: {
    position: 'absolute',
    right: _.wind - _.sm,
    bottom: 0,
    paddingHorizontal: _.sm,
    marginBottom: -6,
    backgroundColor: _.colorPlain
  }
})
