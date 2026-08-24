/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:10:54
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { TITLE_CATALOG } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import Catalog from './catalog'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function CatalogWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.showCalalog[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-catalog'>
        <BlockAnchor title={TITLE_CATALOG} onBlockRef={onBlockRef} />
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
}

export default observer(CatalogWrap)
