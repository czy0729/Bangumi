/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:51:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 06:42:40
 */
import React, { useCallback, useMemo } from 'react'
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
import { appNavigate } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import SectionTitle from '../section-title'
import { getHtmlTextLength } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Top() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { blogId } = $
    const { related, _loaded } = $.blog

    const memoEvent = useMemo(
      () =>
        ({
          id: '日志.跳转',
          data: {
            from: '#0',
            blogId
          }
        } as const),
      [blogId]
    )

    const handleLinkPress = useCallback(
      (href: string) => appNavigate(href, navigation, {}, memoEvent),
      [memoEvent]
    )
    const handlePress = useCallback(({ id, name, image }) => {
      navigation.push('Subject', {
        subjectId: id,
        _jp: name,
        _image: getCoverSrc(image, IMG_WIDTH_SM)
      })

      t('日志.跳转', {
        to: 'Subject',
        from: '关联条目',
        subjectId: id
      })
    }, [])

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

    return (
      <>
        <HeaderPlaceholder />
        <View style={styles.container}>
          <Text type='title' size={20} bold>
            {$.title}
          </Text>
          {!!$.time && (
            <Flex>
              <Text type='sub' size={13} lineHeight={20}>
                {$.time}
              </Text>
              <Text type='sub' size={13} lineHeight={20}>
                {' '}
                · 约 {getHtmlTextLength($.html)}字
              </Text>
            </Flex>
          )}

          <Flex style={styles.userWrap}>
            {!!$.avatar && (
              <UserStatus userId={$.userId}>
                <Avatar
                  navigation={navigation}
                  event={memoEvent}
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
                html={
                  $.html
                  // .replace(/(<br\s*\/?>[\s\n]*)+/gi, '<br>').replace(/<br>/g, '\n\n')
                }
                onLinkPress={handleLinkPress}
              />
            )}
          </View>
        </View>

        <Divider />

        {!!related?.length && (
          <>
            <Text style={styles.title} type='title' size={20} bold>
              关联条目
            </Text>
            <HorizontalList
              data={related}
              width={IMG_WIDTH_SM}
              height={IMG_HEIGHT_SM}
              findCn
              onPress={handlePress}
            />
          </>
        )}

        <SectionTitle />
      </>
    )
  })
}

export default Top
