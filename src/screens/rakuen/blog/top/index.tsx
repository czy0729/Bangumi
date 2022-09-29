/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:51:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:18:13
 */
import React from 'react'
import { View } from 'react-native'
import {
  HeaderPlaceholder,
  Flex,
  Text,
  UserStatus,
  RenderHtml,
  Divider
} from '@components'
import { Avatar, HorizontalList } from '@_'
import { _ } from '@stores'
import { simpleTime, appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import SectionTitle from '../section-title'
import { Ctx } from '../types'
import { styles } from './styles'

function Top(props, { $, navigation }: Ctx) {
  // @ts-ignore
  const { related = [] } = $.blog
  const event = {
    id: '日志.跳转',
    data: {
      from: '#0',
      blogId: $.blogId
    }
  } as const

  return (
    <>
      <HeaderPlaceholder />
      <View style={styles.container}>
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
          {!!$.avatar && (
            <UserStatus userId={$.userId}>
              <Avatar
                navigation={navigation}
                event={event}
                size={40}
                src={$.avatar}
                userId={$.userId}
                name={$.userName}
              />
            </UserStatus>
          )}
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
      {!!related.length && (
        <HorizontalList
          style={_.mt.sm}
          data={related}
          width={80}
          height={106}
          findCn
          onPress={({ id, name, image }) => {
            t('日志.跳转', {
              to: 'Subject',
              from: '关联条目',
              subjectId: id
            })
            navigation.push('Subject', {
              subjectId: id,
              _jp: name,
              _image: image
            })
          }}
        />
      )}
      <SectionTitle />
    </>
  )
}

export default obc(Top)
