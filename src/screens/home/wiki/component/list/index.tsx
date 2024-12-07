/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 15:56:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, HorizontalList, ScrollView, Text } from '@components'
import { Cover, Tag } from '@_'
import { _ } from '@stores'
import { getCoverLarge, showImageViewer, simpleTime, stl } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT, COVER_HEIGHT, COVER_WIDTH } from './ds'

class List extends React.Component<Ctx> {
  renderCovers() {
    const { $, navigation } = this.props
    const { covers } = $.wiki
    if (!covers?.length) return null

    return (
      <HorizontalList
        style={_.mv.sm}
        contentContainerStyle={_.container.wind}
        data={covers}
        initialRenderNums={_.device(5, 12)}
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
              cdn={false}
              onPress={() => {
                showImageViewer(
                  covers.map(item => ({
                    url: `https:${getCoverLarge(item.cover)}`
                  })),
                  index
                )
              }}
            />
            <Text
              style={_.mt.sm}
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
              <Text type='sub' size={11} bold>
                by{' '}
              </Text>
              {userName || userId || '-'}
            </Text>
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
          <View key={id} style={_.mv.md}>
            <Flex>
              <Tag type='primary' value={String(edits.length - index)} />
              <Text style={_.ml.sm} lineHeight={15} bold>
                {comment || '-'}
                {!!sub && (
                  <Text size={13} lineHeight={15} bold>
                    {' '}
                    ({sub})
                  </Text>
                )}
              </Text>
            </Flex>
            {!!(userName || userId) && (
              <Flex style={_.mt.xs}>
                <Text size={12} lineHeight={13} bold>
                  {simpleTime(time)}
                </Text>
                <Text style={_.ml.xs} type='sub' size={12} lineHeight={13} bold>
                  by
                </Text>
                <Text
                  style={_.ml.xs}
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
                  {userName || userId || '-'}
                </Text>
              </Flex>
            )}
          </View>
        ))}
      </View>
    )
  }

  render() {
    r(COMPONENT)

    return (
      <ScrollView contentContainerStyle={_.container.page}>
        {this.renderCovers()}
        {this.renderEdits()}
      </ScrollView>
    )
  }
}

export default ob(List)
