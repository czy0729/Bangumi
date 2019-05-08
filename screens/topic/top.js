/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 20:08:06
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  HeaderPlaceholder,
  Flex,
  Image,
  Text,
  RenderHtml,
  Divider
} from '@components'
import { appNavigate } from '@utils/app'
import { IOS } from '@constants'
import _, { colorBorder } from '@styles'

const Top = (props, { $, navigation }) => {
  const {
    title,
    groupThumb,
    group,
    time,
    avatar,
    userName,
    userId,
    userSign
  } = $.topic
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.wind}>
        <Text type='title' size={20} bold>
          {title}
        </Text>
        <Flex style={_.mt.sm}>
          <Flex>
            <Image size={16} src={groupThumb} radius border={colorBorder} />
            <Text style={_.ml.sm} size={13} underline>
              {group}
            </Text>
          </Flex>
          <Text style={_.ml.sm} type='sub' size={13}>
            /
          </Text>
          <Flex.Item style={_.ml.sm}>
            <Text type='sub' size={13}>
              {time}
            </Text>
          </Flex.Item>
        </Flex>
        <Flex style={_.mt.md}>
          <Image size={40} src={avatar} radius border={colorBorder} />
          <Flex.Item style={_.ml.sm}>
            <Text numberOfLines={2}>
              {userName}
              <Text type='sub'> @{userId}</Text>
            </Text>
            {!!userSign && (
              <Text style={_.mt.xs} type='sub' size={12}>
                {userSign}
              </Text>
            )}
          </Flex.Item>
        </Flex>
        <RenderHtml
          style={_.mt.lg}
          html={$.topic.message}
          onLinkPress={href => appNavigate(href, navigation)}
        />
      </View>
      <Divider />
    </>
  )
}

Top.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Top)

const styles = StyleSheet.create({})
