/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-19 18:58:31
 */
import React from 'react'
import { View } from 'react-native'
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
import { simpleTime } from '@utils'
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
    userSign,
    message
  } = $.topic
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Text type='title' size={20} bold>
          {title}
        </Text>
        <Flex style={_.mt.sm} align='start'>
          <Image size={16} src={groupThumb} radius border={colorBorder} />
          <Text style={_.ml.sm}>
            <Text size={13} underline numberOfLines={1}>
              {group}
            </Text>
            {!!time && (
              <>
                <Text style={_.ml.sm} type='sub' size={13}>
                  {' '}
                  /{' '}
                </Text>
                <Text type='sub' size={13}>
                  {simpleTime(time)}
                </Text>
              </>
            )}
          </Text>
        </Flex>
        {!!message && (
          <>
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
              html={message}
              onLinkPress={href => appNavigate(href, navigation)}
            />
          </>
        )}
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
