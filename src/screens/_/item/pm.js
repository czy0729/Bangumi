/*
 * @Author: czy0729
 * @Date: 2020-02-02 04:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 16:58:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'

function ItemPM({
  navigation,
  event,
  index,
  id,
  title,
  content,
  avatar,
  name,
  userId,
  time,
  new: isNew,
  onRefresh
}) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        userId={userId}
        name={name}
        src={avatar}
        event={event}
      />
      <Flex.Item style={[styles.item, !!index && styles.border, _.ml.sm]}>
        <Touchable
          onPress={() => {
            t(event.id, {
              to: 'PM',
              ...event.data
            })

            navigation.push('PM', {
              id
            })

            if (isNew) {
              setTimeout(() => {
                onRefresh()
              }, 4000)
            }
          }}
        >
          <Flex>
            <Flex.Item>
              <Text size={13} type='title' bold>
                {name}{' '}
                <Text size={11} lineHeight={13} type='sub'>
                  {time}
                </Text>
              </Text>
              <Text style={_.mt.xs} lineHeight={1.8} type='main' bold>
                {title}
              </Text>
              <Text size={13} lineHeight={1.8} type='title'>
                {content}
              </Text>
            </Flex.Item>
            {isNew && (
              <Text style={_.ml.sm} type='danger'>
                new
              </Text>
            )}
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

ItemPM.defaultProps = {
  event: EVENT,
  onRefresh: Function.prototype
}

export default observer(ItemPM)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
