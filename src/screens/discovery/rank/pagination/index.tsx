/*
 * @Author: czy0729
 * @Date: 2022-06-03 12:34:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:48:32
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { HEATMAPS } from './ds'
import { styles } from './styles'

function Pagination(props, { $ }: Ctx) {
  const { type, ipt } = $.state
  return (
    <PaginationComp
      style={styles.pagination}
      input={ipt[type]}
      heatmaps={HEATMAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination)
