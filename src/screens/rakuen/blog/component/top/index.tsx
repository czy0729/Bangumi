/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:51:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:28:47
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
import { Avatar, HorizontalList, Name } from '@_'
import { _, useStore } from '@stores'
import { appNavigate, simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import SectionTitle from '../section-title'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Top() {
  const { $, navigation } = useStore<Ctx>()
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
              {'  '}
              {simpleTime($.time)}
            </Text>
          )}
        </Text>
        <Flex style={styles.userWrap}>
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
              <Name userId={$.userId} numberOfLines={1} bold>
                {$.userName}
              </Name>
              <Text style={_.mt.xs} type='sub' size={12}>
                @{$.userId}
              </Text>
            </Flex.Item>
          )}
        </Flex>
        <View style={styles.html}>
          {!!$.html && (
            <RenderHtml
              style={_.mt.md}
              html={$.html.replace(/(<br\s*\/?>[\s\n]*)+/gi, '<br>').replace(/<br>/g, '\n\n')}
              onLinkPress={href => appNavigate(href, navigation, {}, event)}
            />
          )}
        </View>
      </View>
      <Divider />
      {!!related.length && (
        <>
          <Text style={styles.title} type='title' size={20} bold>
            关联条目
          </Text>
          <HorizontalList
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
        </>
      )}
      <SectionTitle />
    </>
  )
}

export default ob(Top, COMPONENT)
