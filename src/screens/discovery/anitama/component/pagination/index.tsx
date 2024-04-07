/*
 * @Author: czy0729
 * @Date: 2022-06-05 06:03:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:20:17
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { HEAT_MAPS } from './ds'
import { styles } from './styles'

function Pagination(props, { $ }: Ctx) {
  return (
    <PaginationComp
      style={styles.pagination}
      input={$.state.ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination)
