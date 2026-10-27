/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 通知 / 私信列表
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_NOTIFY_HEIGHT } from '@_'
import { useStore } from '@stores'
import { keyExtractorNotify, keyExtractorPm, renderNotifyItem, renderPmInItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const sharedProps = useMemo(
    () => ({
      contentContainerStyle: styles.contentContainerStyle,
      estimatedItemHeight: ITEM_NOTIFY_HEIGHT,
      scrollEventThrottle: 16,
      onScroll: $.onScroll
    }),
    [$]
  )

  const handlePmHeaderRefresh = useCallback(() => $.fetchPM(true, 'pmIn'), [$])
  const handlePmFooterRefresh = useCallback(() => $.fetchPM(false, 'pmIn'), [$])

  if (id === 'notify') {
    return (
      <ListView
        {...sharedProps}
        keyExtractor={keyExtractorNotify}
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
        keyExtractor={keyExtractorPm}
        data={$.pmIn}
        skipEnteringExitingAnimations={10}
        renderItem={renderPmInItem}
        onHeaderRefresh={handlePmHeaderRefresh}
        onFooterRefresh={handlePmFooterRefresh}
      />
    )
  }

  return null
}

export default observer(List)
