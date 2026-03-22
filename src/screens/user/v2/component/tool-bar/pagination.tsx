/*
 * @Author: czy0729
 * @Date: 2023-05-13 04:45:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:13:07
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { generateArray } from './utils'

import type { Ctx } from '../../types'
import type { PaginationProps } from './types'

function Pagination({ pageCurrent, pageTotal }: PaginationProps) {
  const { $ } = useStore<Ctx>()

  const memoData = useMemo(() => generateArray(pageTotal), [pageTotal])

  const handleSelect = useCallback(
    (title: (typeof memoData)[number]) => {
      $.onPage(title)
    },
    [$]
  )

  return (
    <ToolBar.Popover
      data={memoData}
      icon='md-notes'
      iconColor={_.colorDesc}
      text={pageCurrent}
      type='desc'
      onSelect={handleSelect}
    />
  )
}

export default observer(Pagination)
