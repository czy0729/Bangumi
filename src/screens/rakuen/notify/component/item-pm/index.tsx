/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 06:38:08
 */
import React from 'react'
import { ItemPM as ItemPMComp } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function ItemPM({ id, item, index }: Props) {
  const { $ } = useStore<Ctx>()
  return <ItemPMComp {...item} event={EVENT} index={index} onRefresh={() => $.fetchPM(true, id)} />
}

export default ob(ItemPM, COMPONENT)
