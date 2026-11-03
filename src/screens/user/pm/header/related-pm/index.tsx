/*
 * @Author: czy0729
 * @Date: 2025-07-24 02:26:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 相关短信菜单: 新建短信、会话线程切换、浏览器打开
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2Popover, Text } from '@components'
import { _, useStore } from '@stores'
import { open, stl } from '@utils'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT, TEXT_NEW_TOPIC } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function RelatedPM() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { threads, url, userId, pmDetail, onThreadChange } = $
  const isNewPM = !!userId
  const {
    peerUserId,
    peerUserName,
    formhash: pmFormhash,
    msg_receivers: pmMsgReceivers
  } = pmDetail?.form || {}

  const titles = threads.map(t => t.title)
  const hasTitles = titles.length
  const showNum = hasTitles > 2

  const data: string[] = []
  if (!isNewPM) data.push(TEXT_NEW_TOPIC, TEXT_MENU_SPLIT)
  if (hasTitles) data.push(...titles, TEXT_MENU_SPLIT)
  data.push(TEXT_MENU_BROWSER)

  /** data 中第一个 thread 标题的位置，动态计算避免硬编码偏移 */
  const threadOffset = hasTitles ? data.indexOf(titles[0]) : 0

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
        data={data}
        name={hasTitles ? 'md-read-more' : 'md-more-horiz'}
        color={_.colorTitle}
        onSelect={handleSelect}
      />
      {showNum && (
        <Text style={stl(_.ml._xs, _.mt.sm)} size={10} bold>
          {hasTitles}
        </Text>
      )}
    </Flex>
  )
}

export default observer(RelatedPM)
