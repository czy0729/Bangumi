/*
 * @Author: czy0729
 * @Date: 2023-05-12 07:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:06:09
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Pagination({ pageTotal }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { ipt } = $.state

  const handleSearch = useCallback(() => {
    $.onPage(ipt)
  }, [$, ipt])

  return (
    <PaginationComp
      style={_.mt.sm}
      input={ipt}
      pageTotal={pageTotal}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onPageChange}
      onSearch={handleSearch}
    />
  )
}

export default observer(Pagination)
