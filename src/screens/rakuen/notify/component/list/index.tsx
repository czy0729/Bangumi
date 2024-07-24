/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-24 20:13:41
 */
import React from 'react'
import { ListView, ListViewProps } from '@components'
import { obc } from '@utils/decorators'
import { Ctx, TabsKey } from '../../types'
import { keyExtractor, renderNotifyItem, renderPmInItem, renderPmOutItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List({ id }: { id: TabsKey }, { $ }: Ctx) {
  const passProps: ListViewProps = {
    keyExtractor,
    contentContainerStyle: styles.contentContainerStyle,
    scrollEventThrottle: 16,
    onScroll: $.onScroll
  }

  switch (id) {
    case 'notify':
      passProps.data = $.mergeNotify
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

export default obc(List, COMPONENT)
