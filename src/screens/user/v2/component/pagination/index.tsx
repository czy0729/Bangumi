/*
 * @Author: czy0729
 * @Date: 2023-05-12 07:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:41:12
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Pagination(props, { $ }: Ctx) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={_.mt.md}
      input={ipt}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPageChange}
      onSearch={() => $.onPage(ipt)}
    />
  )
}

export default obc(Pagination, COMPONENT)
