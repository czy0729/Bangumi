/*
 * @Author: czy0729
 * @Date: 2026-01-21 08:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:14:01
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Iconfont, Text, Touchable } from '@components'
import { SectionHeader } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Section({ title }: { title: string }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.toggleFriendGroup(title)
  }, [$, title])

  return useObserver(() => {
    const styles = memoStyles()
    const { filter, friendGroup, friendGroupShows } = $.state

    let text: string | number
    if (title === '未知') {
      text = '点击右上按钮获取活跃度以进行分组'
    } else {
      text = friendGroup?.[title]?.length || 0
    }

    const show = friendGroupShows[title]

    return (
      <Touchable onPress={handlePress}>
        <SectionHeader
          style={styles.sectionHeader}
          type='title'
          size={15}
          right={
            !filter && (
              <Iconfont
                style={styles.arrow}
                name={show ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
              />
            )
          }
        >
          {title}{' '}
          {!!text && (
            <Text type='sub' size={13} bold lineHeight={15}>
              {' '}
              {text}
            </Text>
          )}
        </SectionHeader>
      </Touchable>
    )
  })
}

export default Section
