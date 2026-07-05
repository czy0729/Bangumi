/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 22:57:23
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor, renderNotifyItem, renderPmInItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const sharedProps = {
    keyExtractor,
    contentContainerStyle: styles.contentContainerStyle,
    scrollEventThrottle: 16,
    onScroll: $.onScroll
  } as const

  const handlePmHeaderRefresh = useCallback(() => $.fetchPM(true, 'pmIn'), [$])
  const handlePmFooterRefresh = useCallback(() => $.fetchPM(false, 'pmIn'), [$])

  if (id === 'notify') {
    return (
      <ListView
        {...sharedProps}
        data={$.mergeNotify}
        skipEnteringExitingAnimations={10}
        renderItem={renderNotifyItem}
        onHeaderRefresh={$.fetchNotify}
      />
    )
  }

  if (id === 'pmIn') {
    return (
      <ListView
        {...sharedProps}
        data={$.pmIn}
        renderItem={renderPmInItem}
        onHeaderRefresh={handlePmHeaderRefresh}
        onFooterRefresh={handlePmFooterRefresh}
      />
    )
  }

  return null
}

export default observer(List)
