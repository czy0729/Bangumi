/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:18:08
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { ListItem, Ctx } from '../types'
import { collectionStore, subjectStore } from '@stores'

const EVENT = {
  id: '目录详情.跳转'
} as const

function Item(
  {
    index = 0,
    item
  }: {
    index: number
    item: ListItem
  },
  { $, navigation }: Ctx
) {
  const id = String(item.id).match(/\d+/)[0]
  const collection = collectionStore.collect(id)
  if ($.isList) {
    return (
      <>
        <ItemCollections
          navigation={navigation}
          event={EVENT}
          id={id}
          type={item.type}
          cover={item.image}
          name={subjectStore.jp(id) || item.title}
          nameCn={subjectStore.cn(id) || findSubjectCn(item.title, id)}
          tip={item.info}
          comments={item.comment}
          score={item.score}
          rank={item.rank}
          total={item.total}
          numberOfLines={3}
          modify={item.modify}
          isCollect={item.isCollect}
          collection={collection}
          isCatalog
          hideScore={$.hideScore}
          isEditable={$.isSelf}
          showManage
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
      name={subjectStore.jp(id) || item.title}
      nameCn={subjectStore.cn(id) || findSubjectCn(item.title, id)}
      cover={item.image}
      score={item.score}
      rank={item.rank}
      typeCn={item.type}
      collection={collection}
    />
  )
}

export default obc(Item)
