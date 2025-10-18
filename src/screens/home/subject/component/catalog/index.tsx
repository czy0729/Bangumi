/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 04:58:26
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_CATALOG } from '../../ds'
import Split from '../split'
import Catalog from './catalog'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function CatalogWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showCalalog[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-catalog'>
          <View
            ref={ref => onBlockRef(ref, TITLE_CATALOG)}
            style={_.container.layout}
            collapsable={false}
          />
          <Catalog
            styles={memoStyles()}
            showCatalog={systemStore.setting.showCatalog}
            catalog={$.filterCatalog}
            onSwitchBlock={$.onSwitchBlock}
          />
          <Split />
        </Component>
      </Suspense>
    )
  })
}

export default CatalogWrap
