/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:51:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:42:27
 */
import React from 'react'
import { View } from 'react-native'
import {
  Divider,
  Flex,
  HeaderPlaceholder,
  Loading,
  RenderHtml,
  Text,
  UserStatus
} from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Avatar, HorizontalList } from '@_'
import { _ } from '@stores'
import { appNavigate, simpleTime } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import SectionTitle from '../section-title'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Top(props, { $, navigation }: Ctx) {
  const { related = [], _loaded } = $.blog
  const event = {
    id: '日志.跳转',
    data: {
      from: '#0',
      blogId: $.blogId
    }
  } as const

  if (!_loaded) {
    return (
      <>
        <HeaderPlaceholder />
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      </>
    )
  }

  const width = 80
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
          width={width}
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
              _image: getCoverSrc(image, width)
            })
          }}
        />
      )}
      <SectionTitle />
    </>
  )
}

export default obc(Top, COMPONENT)
