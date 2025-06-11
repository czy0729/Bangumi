import { HeaderV2Popover } from '@components'
/*
 * @Author: czy0729
 * @Date: 2025-06-10 19:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 00:56:57
 */
import { useStore } from '@stores'
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
    return <HeaderV2Popover data={data} name='md-menu' size={20} onSelect={$.onFilter} />
  })
}

export default Empty
