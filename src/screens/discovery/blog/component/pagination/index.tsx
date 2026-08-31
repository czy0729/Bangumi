/*
 * @Author: czy0729
 * @Date: 2024-08-09 05:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 04:33:39
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT, HEATMAPS } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Pagination({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt[type]}
      heatmaps={HEATMAPS}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default observer(Pagination)
