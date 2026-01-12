/*
 * @Author: czy0729
 * @Date: 2025-06-10 19:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-11 05:44:42
 */
import { HeaderV2Popover } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Empty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.list?.length) return null

    const data = [`全部 (${$.list.length})`, ...$.tags($.state.page)]

    return (
      <HeaderV2Popover
        data={data}
        name='md-filter-list'
        color={$.state.filter ? _.colorMain : _.colorTitle}
        size={20}
        onSelect={$.onFilter}
      />
    )
  })
}

export default Empty
