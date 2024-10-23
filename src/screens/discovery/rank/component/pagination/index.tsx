/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-19 18:25:35
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEATMAPS } from './ds'

function Pagination(_props, { $ }: Ctx) {
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

export default obc(Pagination, COMPONENT)
