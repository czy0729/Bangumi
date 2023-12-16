/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 09:49:09
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { URL_DEFAULT_AVATAR } from '@constants'
import { TITLE_CATALOG } from '../ds'
import { Ctx } from '../types'
import Catalog from './catalog'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $ }: Ctx) => {
  rerender('Subject.Catalog')

  if (!$.showCalalog[1]) return null

  const { showCatalog } = systemStore.setting
  let _catalog = $.catalog
  if ($.filterDefault || $.isLimit) {
    _catalog = _catalog.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_CATALOG)} />
      <Catalog
        styles={memoStyles()}
        showCatalog={showCatalog}
        catalog={_catalog}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
