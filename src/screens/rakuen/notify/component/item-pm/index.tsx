/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ItemPM as ItemPMComp } from '@_'
import { useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemPM({ id, item, index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRefresh = useCallback(() => $.fetchPM(true, id), [$, id])

  return <ItemPMComp {...item} event={EVENT} index={index} onRefresh={handleRefresh} />
}

export default observer(ItemPM)
