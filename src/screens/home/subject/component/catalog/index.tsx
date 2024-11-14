/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:36:18
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_CATALOG } from '../../ds'
import { Ctx } from '../../types'
import Catalog from './catalog.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CatalogWrap({ onBlockRef }) {
  const { $ } = useStore<Ctx>()
  if (!$.showCalalog[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-catalog'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_CATALOG)} />
        <Catalog
          styles={memoStyles()}
          showCatalog={systemStore.setting.showCatalog}
          catalog={$.filterCatalog}
          onSwitchBlock={$.onSwitchBlock}
        />
      </Component>
    </Suspense>
  )
}

export default ob(CatalogWrap, COMPONENT)
