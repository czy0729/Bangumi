/*
 * @Author: czy0729
 * @Date: 2020-11-11 11:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 02:24:37
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Component, Flex, RenderHtml, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { appNavigate, stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { EVENT } from '@constants'
import { InView, Name } from '../../base'
import { getBgmHtml } from './utils'
import { AVATAR_SIZE, COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemSayProps } from './types'

export { ItemSayProps }

export const ItemSay = ob(
  ({
    index,
    event = EVENT,
    position = 'left',
    avatar,
    showName,
    name,
    text,
    id,
    time,
    format = true,
    onLongPress
  }: ItemSayProps) => {
    const navigation = useNavigation()
    const styles = memoStyles()
    const isRight = position === 'right'

    const elAvatar = (
      <UserStatus userId={id}>
        <Avatar
          navigation={navigation}
          src={avatar}
          size={AVATAR_SIZE}
          userId={id}
          name={name}
          borderWidth={0}
          event={event}
          onLongPress={!isRight ? onLongPress : undefined}
        />
      </UserStatus>
    )

    const elName =
      showName &&
      (isRight ? (
        <Text style={_.mr.sm} size={11} type='title' bold>
          {!!time && (
            <Text type='sub' size={11} bold>
              {time}
              {' · '}
            </Text>
          )}
          {name}
        </Text>
      ) : (
        <View style={_.ml.sm}>
          <Name
            userId={id}
            showFriend
            size={11}
            type='title'
            bold
            right={
              !!time && (
                <Text type='sub' size={11} bold>
                  {' · '}
                  {time}
                </Text>
              )
            }
          >
            {name}
          </Name>
        </View>
      ))

    const elText = (
      <View style={stl(styles.text, isRight && styles.textActive, _.mt.sm)}>
        <RenderHtml
          baseFontStyle={styles.baseFontStyle}
          html={format ? getBgmHtml(text) : text}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
        />
      </View>
    )

    return (
      <Component id='item-say' data-type={position}>
        <Flex style={showName ? _.mt.md : _.mt.sm} align='start'>
          {!isRight && (
            <Flex style={[styles.avatarWrap, styles.avatarWrapLeft]} justify='center'>
              <InView y={128 * (index + 1)}>{elAvatar}</InView>
            </Flex>
          )}

          <Flex.Item style={[styles.content, isRight ? styles.contentRight : styles.contentLeft]}>
            <Flex direction='column' align={isRight ? 'end' : 'start'}>
              {elName}
              {elText}
            </Flex>
          </Flex.Item>

          {isRight && (
            <Flex style={[styles.avatarWrap, styles.avatarWrapRight]} justify='center'>
              {elAvatar}
            </Flex>
          )}
        </Flex>
      </Component>
    )
  },
  COMPONENT
)

export default ItemSay
