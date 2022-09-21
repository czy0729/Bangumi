/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:12:09
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, HorizontalList, Divider } from '@components'
import { Avatar, Cover } from '@_'
import { _ } from '@stores'
import { simpleTime, getCoverLarge, showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT, API_AVATAR } from '@constants'
import { Ctx } from '../types'

const COVER_WIDTH = _.r(IMG_WIDTH * 1.28)
const COVER_HEIGHT = _.r(IMG_HEIGHT * 1.28)

class List extends React.Component {
  renderCovers() {
    const { $, navigation }: Ctx = this.context
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
            style={[
              {
                width: COVER_WIDTH
              },
              !!index && _.ml.md
            ]}
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
              <Avatar
                navigation={navigation}
                userId={userId}
                src={API_AVATAR(userId)}
                size={20}
              />
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
    const { $, navigation }: Ctx = this.context
    const { edits } = $.wiki
    if (!edits?.length) return null

    return (
      <View style={_.container.wind}>
        {edits.map(({ id, comment, sub, time, userId, userName }, index) => (
          <View key={id} style={_.mt.sm}>
            <Text lineHeight={15} bold>
              〔{edits.length - index}〕{comment || '-'}
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
                <Avatar
                  style={_.ml.sm}
                  navigation={navigation}
                  userId={userId}
                  src={API_AVATAR(userId)}
                  size={20}
                />
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
    return (
      <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
        {this.renderCovers()}
        {this.renderEdits()}
      </ScrollView>
    )
  }
}

export default obc(List)
