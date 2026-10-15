/*
 * @Author: czy0729
 * @Date: 2025-10-29 23:02:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:06:59
 *
 * 排行榜条目: 列表与网格两种形态
 */
import { observer } from 'mobx-react'
import { ItemCollectionsGrid, ItemSearch } from '@_'
import { collectionStore, useStore } from '@stores'
import { matchYear } from '@utils'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { TEXT_MUSIC } from '../../ds'
import { getColumnNum } from '../ds'
import { COMPONENT, EVENT_GRID, EVENT_LIST } from './ds'
import { styles } from './styles'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const id = String(item.id).replace('/subject/', '')
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)
  const collection = collectionStore.collect(id, typeCn)

  if ($.isList) {
    return (
      <ItemSearch
        key={item.id}
        navigation={navigation}
        index={index}
        id={item.id}
        name={item.name}
        nameCn={item.nameCn}
        tip={item.tip}
        score={item.score}
        total={item.total}
        rank={item.rank}
        cover={item.cover || $.cover(item.id)}
        collection={collection}
        typeCn={typeCn}
        screen='排行榜'
        event={EVENT_LIST}
      />
    )
  }

  const num = getColumnNum()

  return (
    <ItemCollectionsGrid
      key={item.id}
      style={!(index % num) && styles.left}
      index={index}
      num={num}
      id={id}
      name={item.name}
      nameCn={item.nameCn}
      score={item.score}
      rank={item.rank}
      airtime={$.airtime === '' ? matchYear(item.tip) : ''}
      cover={item.cover || $.cover(item.id)}
      typeCn={typeCn}
      collection={collection}
      isRectangle={typeCn === TEXT_MUSIC}
      event={EVENT_GRID}
    />
  )
}

export default observer(Item)
