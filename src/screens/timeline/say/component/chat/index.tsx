/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 15:27:21
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Chat({ forwardRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { list } = $.say

    return (
      <PaginationList2
        key={list.length}
        forwardRef={forwardRef}
        keyExtractor={keyExtractor}
        style={_.container.screen}
        contentContainerStyle={styles.container}
        data={list}
        inverted
        renderItem={renderItem}
        showFooter={false}
        ListFooterComponent={null}
        onScroll={$.onScroll}
      />
    )
  })
}

export default Chat
