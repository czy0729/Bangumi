/*
 * @Author: czy0729
 * @Date: 2022-07-30 10:41:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 列表布局的单个条目 (ItemSearch)
 */
import { observer } from 'mobx-react'
import { ItemSearch } from '@_'
import { collectionStore, useStore } from '@stores'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function List({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <ItemSearch
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      collection={collectionStore.collect(String(item.id).replace('/subject/', ''))}
      typeCn={$.typeCn}
    />
  )
}

export default observer(List)
