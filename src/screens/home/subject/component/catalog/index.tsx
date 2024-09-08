/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:48:33
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_CATALOG } from '../../ds'
import { Ctx } from '../../types'
import Catalog from './catalog.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CatalogWrap({ onBlockRef }, { $ }: Ctx) {
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

export default obc(CatalogWrap, COMPONENT)
