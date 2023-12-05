/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 22:10:01
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { URL_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import Catalog from './catalog'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  rerender('Subject.Catalog')

  const { showCatalog } = systemStore.setting
  if (showCatalog === -1) return null

  let _catalog = $.catalog
  if ($.filterDefault || $.isLimit) {
    _catalog = _catalog.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  if (!_catalog.length) return null

  return (
    <Catalog
      styles={memoStyles()}
      showCatalog={showCatalog}
      catalog={_catalog}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
