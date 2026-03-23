/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 06:38:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemPM as ItemPMComp } from '@_'
import { useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemPM({ id, item, index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return <ItemPMComp {...item} event={EVENT} index={index} onRefresh={() => $.fetchPM(true, id)} />
}

export default observer(ItemPM)
