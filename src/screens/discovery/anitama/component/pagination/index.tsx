/*
 * @Author: czy0729
 * @Date: 2022-06-05 06:03:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:05:00
 *
 * 底部翻页器
 */
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
