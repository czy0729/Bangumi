/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 00:03:17
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
import { appNavigate } from '@utils/app'
import _, { md, wind, colorPlain, colorBorder } from '@styles'

const Item = (
  { style, index, href, avatar, title, replies, group, time },
  { navigation }
) => (
  <Touchable
    style={[styles.container, style]}
    highlight
    onPress={() => appNavigate(href, navigation)}
  >
    <Flex align='start'>
      <Image
        style={styles.image}
        size={28}
        src={avatar}
        radius
        border={colorBorder}
      />
      <Flex.Item style={[styles.item, index !== 0 && styles.border, _.ml.sm]}>
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

Item.contextTypes = {
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: wind,
    backgroundColor: colorPlain
  },
  image: {
    marginTop: md
  },
  item: {
    paddingVertical: md,
    paddingRight: wind
  },
  border: {
    borderTopColor: colorBorder,
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
