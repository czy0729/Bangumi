/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:22:24
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, RenderHtml, Text, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import { appNavigate, HTMLDecode, open } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { Name } from '../../../base'
import UserLabel from '../user-label'
import { memoStyles } from './styles'
import { Props } from './types'

const AVATAR_WIDTH = 20

function ItemPlusOne({
  id,
  message,
  userId,
  userName,
  avatar,
  url,
  floor,
  directFloor,
  isAuthor,
  isFriend,
  isLayer,
  event
}: Props) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  const imagesMaxWidthSub = _.window.width - 2 * _.wind - 2 * AVATAR_WIDTH - 2 * _.sm
  return (
    <View style={styles.item}>
      <Flex>
        <Flex style={avatarRound ? styles.round : styles.rectangle}>
          <View style={_.mr.xs}>
            <UserStatus userId={userId} mini>
              <Avatar
                navigation={navigation}
                size={AVATAR_WIDTH}
                userId={userId}
                name={userName}
                src={avatar}
                radius={avatarRound ? undefined : 6}
                event={event}
              />
            </UserStatus>
          </View>
          <Name userId={userId} size={10} bold>
            {HTMLDecode(userName)}
          </Name>
          <UserLabel isAuthor={isAuthor} isFriend={isFriend} isLayer={isLayer} lineHeight={10} />
        </Flex>
        <Flex style={styles.html} align='end'>
          <RenderHtml
            style={_.ml.sm}
            baseFontStyle={_.baseFontStyle.sm}
            imagesMaxWidth={imagesMaxWidthSub}
            html={message}
            onLinkPress={href => {
              appNavigate(href, navigation, {}, event)
            }}
            onImageFallback={() => open(`${url}#post_${id}`)}
          />
          {!!floor && (
            <Text type='sub' size={11} lineHeight={14}>
              {'  '}
              {floor}
            </Text>
          )}
        </Flex>
      </Flex>

      {/* 高亮 */}
      {directFloor && <View style={styles.direct} pointerEvents='none' />}
    </View>
  )
}

export default ob(ItemPlusOne)
