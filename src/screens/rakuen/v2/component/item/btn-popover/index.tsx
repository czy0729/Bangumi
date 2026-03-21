/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:58:13
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { TEXT_MENU_IGNORE } from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnPopover({ groupCn, groupHref, href, topicId, userId, userName, isGroup }: Props) {
  const { $, navigation } = useStore<Ctx>()

  const isSubject = useMemo(() => topicId.includes('subject/'), [topicId])

  const memoType = useMemo(() => {
    if (isGroup) return '小组'
    if (isSubject || topicId.includes('ep/')) return '条目'
    return '人物'
  }, [isGroup, isSubject, topicId])

  const memoData = useMemo(() => {
    const data = [`进入${memoType}`, `屏蔽${memoType}`]
    if (isGroup || isSubject) data.push(TEXT_MENU_IGNORE)
    return data
  }, [isGroup, isSubject, memoType])

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

  return (
    <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default observer(BtnPopover)
