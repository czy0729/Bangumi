/*
 * @Author: czy0729
 * @Date: 2024-08-09 05:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:36:36
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEATMAPS } from './ds'
import { Props } from './types'

function Pagination({ type }: Props) {
  const { $ } = useStore<Ctx>()
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

export default ob(Pagination, COMPONENT)
