/*
 * @Author: czy0729
 * @Date: 2022-06-04 23:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:11:17
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, HEAT_MAPS } from './ds'
import { styles } from './styles'

function Pagination(props, { $ }: Ctx) {
  return (
    <PaginationComp
      style={styles.pagination}
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
