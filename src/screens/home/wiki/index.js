/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:24:32
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, HorizontalList, Divider } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { getCoverLarge } from '@utils/app'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import Store from './store'

const title = '修订历史'
const coverWidth = IMG_WIDTH * 1.28 * _.ratio
const coverHeight = IMG_HEIGHT * 1.28 * _.ratio

export default
@inject(Store)
@withHeader({
  title: ({ name } = {}) => (name ? `${name}的${title}` : title),
  screen: title,
  hm: ['subjectWiki', 'SubjectWiki']
})
@obc
class SubjectWiki extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  renderCovers() {
    const { $, navigation } = this.context
    const { covers } = $.wiki
    if (!covers?.length) return null

    return (
      <HorizontalList
        style={[_.mt.md, _.mb.md]}
        contentContainerStyle={_.container.wind}
        data={covers}
        initialRenderNums={_.device(4, 8)}
        renderItem={({ cover, userId, userName }, index) => (
          <View key={cover} style={!!index && _.device(_.ml.sm, _.ml.md)}>
            <Cover
              src={cover}
              size={coverWidth}
              height={coverHeight}
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
              <Text type='sub' size={12} lineHeight={14}>
                by
              </Text>
              <Text
                style={_.ml.xs}
                size={13}
                lineHeight={14}
                bold
                onPress={() =>
                  navigation.push('Zone', {
                    userId,
                    _name: userName
                  })
                }
              >
                {userName || userId}
              </Text>
            </Flex>
          </View>
        )}
      />
    )
  }

  renderEdits() {
    const { $, navigation } = this.context
    const { edits } = $.wiki
    if (!edits?.length) return null

    return (
      <View style={_.container.wind}>
        {edits.map(({ id, comment, sub, time, userId, userName }) => (
          <View key={id} style={_.mt.sm}>
            <Text type='main' lineHeight={15} bold>
              {comment || '-'}
              {!!sub && (
                <Text type='main' size={13} lineHeight={15} bold>
                  {' '}
                  ({sub})
                </Text>
              )}
            </Text>
            {!!(userName || userId) && (
              <Flex style={_.mt.xs}>
                <Text size={13} lineHeight={14} bold>
                  {simpleTime(time)}
                </Text>
                <Text style={_.ml.xs} type='sub' size={12} lineHeight={14}>
                  by
                </Text>
                <Text
                  style={_.ml.xs}
                  size={13}
                  lineHeight={14}
                  bold
                  onPress={() =>
                    navigation.push('Zone', {
                      userId,
                      _name: userName
                    })
                  }
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
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        {this.renderCovers()}
        {this.renderEdits()}
      </ScrollView>
    )
  }
}
