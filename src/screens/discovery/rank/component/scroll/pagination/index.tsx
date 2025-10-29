/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:18:17
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, HEATMAPS } from './ds'

import type { Ctx } from '../../../types'

function Pagination() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt[$.state.type]}
      heatmaps={HEATMAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPaginationInputChange}
      onSearch={$.doSearch}
    />
  ))
}

export default Pagination
