/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:50:11
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { CatalogItem, Ctx } from '../types'

const EVENT = {
  id: '目录详情.跳转'
} as const

function Item(
  {
    index = 0,
    item
  }: {
    index: number
    item: CatalogItem
  },
  { $, navigation }: Ctx
) {
  const id = String(item.id).match(/\d+/)[0]
  const nameCn = findSubjectCn(item.title, item.id)
  const collection = $.userCollectionsMap[id]

  if ($.isList) {
    return (
      <>
        <ItemCollections
          navigation={navigation}
          event={EVENT}
          id={id}
          type={item.type}
          cover={item.image}
          name={item.title}
          nameCn={nameCn}
          tip={item.info}
          comments={item.comment}
          score={item.score}
          rank={item.rank}
          modify={item.modify}
          isCollect={item.isCollect}
          collection={collection}
          isCatalog
          hideScore={$.hideScore}
          isEditable={$.isSelf}
          onEdit={$.onEdit}
        />
        {!index && <Heatmap id='目录详情.跳转' />}
      </>
    )
  }

  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={EVENT}
      id={id}
      num={$.gridNum}
      name={item.title}
      nameCn={nameCn}
      cover={item.image}
      score={item.score}
      rank={item.rank}
      typeCn={item.type}
      collection={collection}
    />
  )
}

export default obc(Item)
