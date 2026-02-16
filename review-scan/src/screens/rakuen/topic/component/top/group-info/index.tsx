/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:26:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:23:08
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Cover, Flex, Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { appNavigate, findSubjectCn, HTMLDecode, simpleTime } from '@utils'
import { r } from '@utils/dev'
import { HOST, IMG_EMPTY, IMG_EMPTY_DARK } from '@constants'
import { Ctx } from '../../../types'
import WordCloud from '../../word-cloud'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function GroupInfo() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const isEp = $.topicId.includes('ep/')
    return (
      <Flex style={styles.container}>
        {!!$.group && (
          <Flex style={styles.label}>
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
                <Text style={styles.text} size={13} numberOfLines={1}>
                  {HTMLDecode(findSubjectCn($.group))}
                </Text>
              </Flex>
            </Touchable>
          </Flex>
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
  })
}

export default GroupInfo
