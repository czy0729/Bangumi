/*
 * @Author: czy0729
 * @Date: 2022-06-04 23:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:07:26
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT, HEAT_MAPS } from './ds'

import type { Ctx } from '../../types'

function Pagination() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <PaginationComp
      style={_.mt.xs}
      input={$.state.ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  ))
}

export default Pagination
