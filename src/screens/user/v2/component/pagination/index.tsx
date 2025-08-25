/*
 * @Author: czy0729
 * @Date: 2023-05-12 07:30:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 12:12:14
 */
import React, { useCallback } from 'react'
import { Pagination as PaginationComp } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Pagination({ pageTotal }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

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
