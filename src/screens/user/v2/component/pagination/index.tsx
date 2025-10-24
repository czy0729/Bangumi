/*
 * @Author: czy0729
 * @Date: 2023-05-12 07:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 19:45:03
 */
import React, { useCallback } from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Pagination({ pageTotal }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { ipt } = $.state

    const handleSearch = useCallback(() => {
      $.onPage(ipt)
    }, [ipt])

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
  })
}

export default Pagination
