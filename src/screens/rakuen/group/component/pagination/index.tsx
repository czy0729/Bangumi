/*
 * @Author: czy0729
 * @Date: 2024-12-08 10:42:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-08 10:51:41
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEAT_MAPS } from './ds'

function Pagination() {
  const { $ } = useStore<Ctx>()
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

export default ob(Pagination, COMPONENT)
