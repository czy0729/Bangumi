/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 05:11:41
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEATMAPS } from './ds'
import { styles } from './styles'

function Pagination(props, { $ }: Ctx) {
  return (
    <PaginationComp
      style={styles.pagination}
      input={$.state.ipt[$.state.type]}
      heatmaps={HEATMAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination, COMPONENT)
