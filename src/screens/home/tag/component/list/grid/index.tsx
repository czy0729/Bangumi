/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:49:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 网格布局的单个条目 (ItemCollectionsGrid)
 */
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, useStore } from '@stores'
import { matchYear } from '@utils'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Grid({ item, index, numColumns }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left}
      index={index}
      event={EVENT}
      num={numColumns}
      {...item}
      typeCn={$.typeCn}
      collection={collectionStore.collect(String(item.id).replace('/subject/', ''))}
      airtime={$.state.airtime === '' && matchYear(item.tip)}
    />
  )
}

export default observer(Grid)
