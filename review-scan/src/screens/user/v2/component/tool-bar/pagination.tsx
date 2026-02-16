/*
 * @Author: czy0729
 * @Date: 2023-05-13 04:45:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-13 20:55:14
 */
import React, { useCallback, useMemo } from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { generateArray } from './utils'

function Pagination({ pageCurrent, pageTotal }) {
  const { $ } = useStore<Ctx>()
  const memoData = useMemo(() => generateArray(pageTotal), [pageTotal])
  const handleSelect = useCallback(
    (title: (typeof memoData)[number]) => {
      $.onPage(title)
    },
    [$]
  )

  return useObserver(() => (
    <ToolBar.Popover
      data={memoData}
      icon='md-notes'
      iconColor={_.colorDesc}
      text={pageCurrent}
      type='desc'
      onSelect={handleSelect}
    />
  ))
}

export default Pagination
