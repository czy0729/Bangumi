/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 11:35:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor, renderNotifyItem, renderPmInItem, renderPmOutItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ListViewProps } from '@components'
import type { NotifyItem } from '@stores/rakuen/types'
import type { PmItem } from '@stores/user/types'
import type { Ctx, TabsKey } from '../../types'

function List({ id }: { id: TabsKey }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const passProps: Partial<ListViewProps<NotifyItem | PmItem>> = {
    keyExtractor,
    contentContainerStyle: styles.contentContainerStyle,
    scrollEventThrottle: 16,
    onScroll: $.onScroll
  } as const

  switch (id) {
    case 'notify':
      passProps.data = $.mergeNotify
      passProps.skipEnteringExitingAnimations = 10
      passProps.renderItem = renderNotifyItem
      passProps.onHeaderRefresh = $.fetchNotify
      break

    case 'pmIn':
      passProps.data = $.pmIn
      passProps.renderItem = renderPmInItem
      passProps.onHeaderRefresh = () => $.fetchPM(true, 'pmIn')
      passProps.onFooterRefresh = () => $.fetchPM(false, 'pmIn')
      break

    case 'pmOut':
      passProps.data = $.pmOut
      passProps.renderItem = renderPmOutItem
      passProps.onHeaderRefresh = () => $.fetchPM(true, 'pmOut')
      passProps.onFooterRefresh = () => $.fetchPM(false, 'pmOut')
      break

    default:
      break
  }

  return <ListView {...passProps} />
}

export default observer(List)
