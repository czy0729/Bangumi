/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 09:49:09
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_CATALOG } from '../../ds'
import { Ctx } from '../../types'
import Catalog from './catalog'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CatalogWrap({ onBlockRef }, { $ }: Ctx) {
  if (!$.showCalalog[1]) return null

  const { showCatalog } = systemStore.setting
  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_CATALOG)} />
      <Catalog
        styles={memoStyles()}
        showCatalog={showCatalog}
        catalog={$.filterCatalog}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(CatalogWrap, COMPONENT)
