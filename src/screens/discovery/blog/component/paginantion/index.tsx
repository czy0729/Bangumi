/*
 * @Author: czy0729
 * @Date: 2024-08-09 05:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 05:43:25
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEATMAPS } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Pagination({ type }: Props, { $ }: Ctx) {
  return (
    <PaginationComp
      style={styles.pagination}
      input={$.state.ipt[type]}
      heatmaps={HEATMAPS}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination, COMPONENT)
