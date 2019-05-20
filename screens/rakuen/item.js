/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-19 22:09:24
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar } from '@screens/_'
import { appNavigate } from '@utils/app'
import _ from '@styles'

const Item = (
  { style, index, href = '', avatar, title, replies, group, time },
  { $, navigation }
) => {
  const isTop = index === 0
  const topicId = href.replace('/rakuen/topic/', '')
  const { _loaded } = $.comments(topicId)
  return (
    <Touchable
      style={[styles.container, _loaded && styles.readed, style]}
      highlight
      onPress={() => appNavigate(href, navigation)}
    >
      <Flex align='start'>
        <Avatar style={styles.image} src={avatar} />
        <Flex.Item style={[styles.item, !isTop && styles.border, _.ml.sm]}>
          <Text size={16}>
            {title}
            <Text type='main' size={12} lineHeight={16}>
              {' '}
              {replies}
            </Text>
          </Text>
          <Text style={_.mt.xs} type='sub' size={12}>
            {correctTime(time)}
            {group ? ' / ' : ''}
            <Text size={12}>{group}</Text>
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  readed: {
    backgroundColor: _.colorBg
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
    borderTopWidth: StyleSheet.hairlineWidth
  }
})

function correctTime(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) {
    _time = _time.replace('ago', ' ago')
  }
  return _time
}
