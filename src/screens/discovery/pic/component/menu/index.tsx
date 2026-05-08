/*
 * @Author: czy0729
 * @Date: 2025-06-10 19:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 20:28:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2Popover } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Menu() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.list?.length) return null

  const data = [`全部 (${$.list.length})`, ...$.tags($.state.page)] as const

  return (
    <HeaderV2Popover
      data={data}
      name='md-filter-list'
      color={$.state.filter ? _.colorMain : _.colorTitle}
      size={20}
      onSelect={$.onFilter}
    />
  )
}

export default observer(Menu)
