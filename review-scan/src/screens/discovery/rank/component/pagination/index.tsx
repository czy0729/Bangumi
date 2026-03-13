/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:45:42
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEATMAPS } from './ds'

function Pagination() {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt[$.state.type]}
      heatmaps={HEATMAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPaginationInputChange}
      onSearch={$.doSearch}
    />
  )
}

export default ob(Pagination, COMPONENT)
