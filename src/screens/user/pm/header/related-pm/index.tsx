/*
 * @Author: czy0729
 * @Date: 2025-07-24 02:26:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:27:51
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2Popover, Text } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT, TEXT_NEW_TOPIC } from '@constants'

import type { Props } from './types'

function RelatedPM({
  navigation,
  threads,
  url,
  isNewPM,
  peerUserId,
  peerUserName,
  pmFormhash,
  pmMsgReceivers,
  onThreadChange
}: Props) {
  const titles = threads.map(t => t.title)
  const hasTitles = titles.length
  const showNum = hasTitles > 2

  const memoData = useMemo(() => {
    const items: string[] = []
    if (!isNewPM) items.push(TEXT_NEW_TOPIC, TEXT_MENU_SPLIT)
    if (titles.length) items.push(...titles, TEXT_MENU_SPLIT)
    items.push(TEXT_MENU_BROWSER)
    return items
  }, [titles, isNewPM])

  /** data 中第一个 thread 标题的位置，动态计算避免硬编码偏移 */
  const threadOffset = hasTitles ? memoData.indexOf(titles[0]) : 0

  const handleSelect = useCallback(
    (title: string, index: number) => {
      if (title === TEXT_NEW_TOPIC) {
        navigation.goBack()
        navigation.push('PM', {
          userId: peerUserId,
          userName: peerUserName,
          pmFormhash,
          pmMsgReceivers
        })
        return
      }

      if (title === TEXT_MENU_BROWSER) {
        open(url)
        return
      }

      if (title === TEXT_MENU_SPLIT) return

      const threadIdx = index - threadOffset
      if (threadIdx < 0 || threadIdx >= threads.length) return

      onThreadChange(threads[threadIdx].id)
    },
    [
      url,
      threadOffset,
      threads,
      peerUserId,
      peerUserName,
      pmFormhash,
      pmMsgReceivers,
      onThreadChange,
      navigation
    ]
  )

  return (
    <Flex style={showNum ? _.mr.sm : _.mr.xs}>
      <HeaderV2Popover
        data={memoData}
        name={hasTitles ? 'md-read-more' : 'md-more-horiz'}
        color={_.colorTitle}
        onSelect={handleSelect}
      />
      {showNum && (
        <Text style={[_.ml._xs, _.mt.sm]} size={10} bold>
          {hasTitles}
        </Text>
      )}
    </Flex>
  )
}

export default observer(RelatedPM)
