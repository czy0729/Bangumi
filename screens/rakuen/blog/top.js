/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:51:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 17:51:00
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { HeaderPlaceholder, Flex, Text, RenderHtml, Divider } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import { IOS } from '@constants'
import SectionTitle from './section-title'

function Top(props, { $, navigation }) {
  const event = {
    id: '日志.跳转',
    data: {
      from: '#0',
      blogId: $.blogId
    }
  }

  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Text type='title' size={20} bold>
          {$.title}
          {!!$.time && (
            <Text type='sub' size={13} lineHeight={20}>
              {' '}
              {simpleTime($.time)}
            </Text>
          )}
        </Text>
        <Flex style={[styles.userWrap, _.mt.md]}>
          <View style={styles.userAvatarWrap}>
            {!!$.avatar && (
              <Avatar
                navigation={navigation}
                event={event}
                size={40}
                src={$.avatar}
                userId={$.userId}
                name={$.userName}
              />
            )}
          </View>
          {!!$.userId && (
            <Flex.Item style={_.ml.sm}>
              <Text numberOfLines={2}>
                {$.userName}
                <Text type='sub'> @{$.userId}</Text>
              </Text>
            </Flex.Item>
          )}
        </Flex>
        <View style={styles.html}>
          {!!$.html && (
            <RenderHtml
              style={_.mt.md}
              html={$.html}
              onLinkPress={href => appNavigate(href, navigation, {}, event)}
            />
          )}
        </View>
      </View>
      <Divider />
      <SectionTitle />
    </>
  )
}

Top.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Top)

const styles = StyleSheet.create({
  groupWrap: {
    height: 32
  },
  groupThumbWrap: {
    width: 30
  },
  userWrap: {
    height: 42
  },
  userAvatarWrap: {
    width: 40
  },
  html: {
    minHeight: 120
  },
  loading: {
    height: 120
  }
})
