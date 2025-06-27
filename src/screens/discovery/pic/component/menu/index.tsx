/*
 * @Author: czy0729
 * @Date: 2025-06-10 19:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 00:12:30
 */
import { HeaderV2Popover } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Empty() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.list?.length) return null

    const data = [`全部 (${$.list.length})`, ...$.tags($.state.page)]
    return (
      <HeaderV2Popover
        data={data}
        name='md-menu'
        color={$.state.filter ? _.colorMain : _.colorTitle}
        size={20}
        onSelect={$.onFilter}
      />
    )
  })
}

export default Empty
