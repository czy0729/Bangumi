/*
 * @Author: czy0729
 * @Date: 2022-06-04 23:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 12:10:48
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEAT_MAPS } from './ds'

function Pagination(_props, { $ }: Ctx) {
  return (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination, COMPONENT)
