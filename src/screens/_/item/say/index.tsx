/*
 * @Author: czy0729
 * @Date: 2020-11-11 11:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-10 18:25:10
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Component, Flex, RenderHtml, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { EVENT, FROZEN_FN } from '@constants'
import { InView, Name } from '../../base'
import { getBgmHtml } from './utils'
import { COMPONENT } from './ds'
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
    onLongPress = FROZEN_FN
  }: ItemSayProps) => {
    const navigation = useNavigation()
    const styles = memoStyles()
    if (position === 'right') {
      return (
        <Component id='item-say' data-type='right'>
          <Flex style={showName ? _.mt.md : _.mt.sm} align='start'>
            <Flex.Item style={styles.contentRight}>
              <Flex direction='column' align='end'>
                {showName && (
                  <Text style={_.mr.sm} size={11} type='title' bold>
                    {!!time && (
                      <Text type='sub' size={11} bold>
                        {time}
                        {' · '}
                      </Text>
                    )}
                    {name}
                  </Text>
                )}
                <View style={[styles.text, styles.textActive, _.mt.xs]}>
                  <RenderHtml
                    baseFontStyle={styles.baseFontStyleRight}
                    linkStyle={styles.linkStyleRight}
                    html={format ? getBgmHtml(text) : text}
                    onLinkPress={href => appNavigate(href, navigation, {}, event)}
                  />
                </View>
              </Flex>
            </Flex.Item>
            <Flex style={styles.avatarWrapRight} justify='center'>
              <UserStatus userId={id}>
                <Avatar
                  navigation={navigation}
                  src={avatar}
                  size={34}
                  userId={id}
                  name={name}
                  borderWidth={0}
                  event={event}
                />
              </UserStatus>
            </Flex>
          </Flex>
        </Component>
      )
    }

    return (
      <Component id='item-say' data-type='left'>
        <Flex style={showName ? _.mt.md : _.mt.sm} align='start'>
          <Flex style={styles.avatarWrapLeft} justify='center'>
            <InView y={128 * (index + 1)}>
              <UserStatus userId={id}>
                <Avatar
                  navigation={navigation}
                  src={avatar}
                  size={34}
                  userId={id}
                  name={name}
                  borderWidth={0}
                  event={event}
                  onLongPress={onLongPress}
                />
              </UserStatus>
            </InView>
          </Flex>
          <Flex.Item style={styles.contentLeft}>
            <Flex direction='column' align='start'>
              {showName && (
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
              )}
              <View style={[styles.text, _.mt.xs]}>
                <RenderHtml
                  baseFontStyle={styles.baseFontStyle}
                  html={format ? getBgmHtml(text) : text}
                  onLinkPress={href => appNavigate(href, navigation, {}, event)}
                />
              </View>
            </Flex>
          </Flex.Item>
        </Flex>
      </Component>
    )
  },
  COMPONENT
)

export default ItemSay
