/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 23:41:28
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TEXT_IGNORE_USER } from '../../../ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnPopover({ groupCn, groupHref, href, topicId, userId, userName, isGroup }: Props) {
  const { $, navigation } = useStore<Ctx>()

  const isSubject = useMemo(() => topicId.includes('subject/'), [topicId])

  const type = useMemo(() => {
    if (isGroup) return '小组'
    if (isSubject || topicId.includes('ep/')) return '条目'
    return '人物'
  }, [isGroup, isSubject, topicId])

  const memoData = useMemo(() => {
    const data = [`进入${type}`, `屏蔽${type}`]
    if (isGroup || isSubject) data.push(TEXT_IGNORE_USER)
    return data
  }, [isGroup, isSubject, type])

  const handleSelect = useCallback(
    (title: string) => {
      $.onExtraSelect(
        title,
        {
          topicId,
          href,
          groupCn,
          groupHref,
          userId,
          userName
        },
        navigation
      )
    },
    [$, navigation, topicId, href, groupCn, groupHref, userId, userName]
  )

  return useObserver(() => (
    <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  ))
}

export default BtnPopover
