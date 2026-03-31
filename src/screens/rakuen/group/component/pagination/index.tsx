/*
 * @Author: czy0729
 * @Date: 2024-12-08 10:42:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:52:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT, HEAT_MAPS } from './ds'

import type { Ctx } from '../../types'

function Pagination() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default observer(Pagination)
