/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 17:55:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.search._loaded) return null

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.search}
      keyboardDismissMode='on-drag'
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.doSearch}
    />
  )
}

export default observer(List)
