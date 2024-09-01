/*
 * @Author: czy0729
 * @Date: 2023-05-12 07:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 12:12:14
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Pagination(_props, { $ }: Ctx) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={_.mt.sm}
      input={ipt}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPageChange}
      onSearch={() => $.onPage(ipt)}
    />
  )
}

export default obc(Pagination, COMPONENT)
