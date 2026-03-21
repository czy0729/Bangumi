/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:26:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:49:26
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Cover, Flex, Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { appNavigate, findSubjectCn, getVisualLength, HTMLDecode, simpleTime } from '@utils'
import { HOST, IMG_EMPTY, IMG_EMPTY_DARK } from '@constants'
import WordCloud from '../../word-cloud'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function GroupInfo() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const isEp = $.topicId.includes('ep/')
  const group = HTMLDecode(findSubjectCn($.group))
  const visualLength = getVisualLength(group)

  return (
    <Flex style={styles.container}>
      {!!group && (
        <View style={styles.label}>
          <Touchable
            animate
            onPress={() => {
              if ($.isMono) {
                appNavigate(`${HOST}/${$.monoId}`, navigation, {}, $.event)
                return
              }

              appNavigate(
                $.groupHref,
                navigation,
                {
                  _jp: $.group
                },
                $.event
              )
            }}
          >
            <Flex>
              <Cover
                size={isEp ? 40 : 20}
                src={$.groupThumbFinal || _.select(IMG_EMPTY, IMG_EMPTY_DARK)}
                radius={5}
                priority='high'
                fallback={isEp}
                fallbackSrc={isEp ? String($.groupThumb).replace('/r/100x100', '') : undefined}
              />
              <Text
                style={_.ml.sm}
                size={visualLength >= 16 ? 11 : visualLength >= 12 ? 12 : 13}
                numberOfLines={1}
                shrink
              >
                {group}
              </Text>
            </Flex>
          </Touchable>
        </View>
      )}

      <Flex.Item>
        {!!$.time && (
          <Text type='sub' size={13}>
            {simpleTime($.time)}
          </Text>
        )}
      </Flex.Item>

      <WordCloud />

      <Heatmap right={74} id='帖子.跳转' to='Group' alias='小组' />
      <Heatmap id='帖子.跳转' to='Subject' alias='条目' transparent />
    </Flex>
  )
}

export default observer(GroupInfo)
