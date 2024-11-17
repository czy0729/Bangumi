/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:40:55
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, HorizontalList, ScrollView, Text } from '@components'
import { Avatar, Cover } from '@_'
import { _ } from '@stores'
import { getCoverLarge, showImageViewer, simpleTime, stl } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { API_AVATAR, WEB } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, COVER_HEIGHT, COVER_WIDTH } from './ds'

class List extends React.Component<Ctx> {
  renderCovers() {
    const { $, navigation } = this.props
    const { covers } = $.wiki
    if (!covers?.length) return null

    return (
      <HorizontalList
        style={[_.mt.md, _.mb.md]}
        contentContainerStyle={_.container.wind}
        data={covers}
        initialRenderNums={_.device(4, 8)}
        renderItem={({ cover, userId, userName }, index) => (
          <View
            key={cover}
            style={stl(
              {
                width: COVER_WIDTH
              },
              !!index && _.ml.md
            )}
          >
            <Cover
              src={cover}
              size={COVER_WIDTH}
              height={COVER_HEIGHT}
              radius
              onPress={() => {
                showImageViewer(
                  covers.map(item => ({
                    url: `https:${getCoverLarge(item.cover)}`
                  })),
                  index
                )
              }}
            />
            <Flex style={_.mt.sm}>
              {!WEB && (
                <Avatar
                  navigation={navigation}
                  userId={userId}
                  src={API_AVATAR(userId)}
                  size={20}
                />
              )}
              <Flex.Item style={_.ml.sm}>
                <Text
                  size={11}
                  bold
                  numberOfLines={1}
                  onPress={() => {
                    navigation.push('Zone', {
                      userId,
                      _name: userName
                    })
                  }}
                >
                  {userName || userId}
                </Text>
              </Flex.Item>
            </Flex>
          </View>
        )}
      />
    )
  }

  renderEdits() {
    const { $, navigation } = this.props
    const { edits } = $.wiki
    if (!edits?.length) return null

    return (
      <View style={_.container.wind}>
        {edits.map(({ id, comment, sub, time, userId, userName }, index) => (
          <View key={id} style={_.mt.sm}>
            <Text lineHeight={15} bold>
              [{edits.length - index}] {comment || 'N/A'}
              {!!sub && (
                <Text size={13} lineHeight={15} bold>
                  {' '}
                  ({sub})
                </Text>
              )}
            </Text>
            {!!(userName || userId) && (
              <Flex style={_.mt.sm}>
                <Text style={_.ml.sm} size={12} lineHeight={13} bold>
                  {simpleTime(time)}
                </Text>
                <Text style={_.ml.xs} type='sub' size={12} lineHeight={13}>
                  by
                </Text>
                {!WEB && (
                  <View style={_.ml.sm}>
                    <Avatar
                      navigation={navigation}
                      userId={userId}
                      src={API_AVATAR(userId)}
                      size={20}
                    />
                  </View>
                )}
                <Text
                  style={_.ml.sm}
                  size={12}
                  lineHeight={13}
                  bold
                  onPress={() => {
                    navigation.push('Zone', {
                      userId,
                      _name: userName
                    })
                  }}
                >
                  {userName || userId}
                </Text>
              </Flex>
            )}
            <Divider style={_.mt.xs} />
          </View>
        ))}
      </View>
    )
  }

  render() {
    r(COMPONENT)

    return (
      <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
        {this.renderCovers()}
        {this.renderEdits()}
      </ScrollView>
    )
  }
}

export default ob(List)
