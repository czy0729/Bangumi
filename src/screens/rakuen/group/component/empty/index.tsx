/*
 * @Author: czy0729
 * @Date: 2026-10-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 空状态
 */
import { observer } from 'mobx-react'
import { EmptyCompact } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Empty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, _loaded } = $.group
  if (!_loaded || list.length) return null

  return <EmptyCompact />
}

export default observer(Empty)
