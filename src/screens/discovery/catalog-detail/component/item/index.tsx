/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:22:51
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { _, collectionStore, subjectStore, useStore } from '@stores'
import { findSubjectCn } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function Item({ index = 0, item }: Props) {
  const { $, navigation } = useStore<Ctx>()
  const id = String(item.id).match(/\d+/)[0]
  const collection = collectionStore.collect(id)
  const jp = subjectStore.jp(id) || item.title
  const cn = subjectStore.cn(id) || findSubjectCn(item.title, id)
  if ($.isList) {
    return (
      <>
        <ItemCollections
          navigation={navigation}
          event={EVENT}
          inViewY={_.window.height * 0.5}
          index={index}
          id={id}
          type={item.type}
          cover={item.image}
          name={jp}
          nameCn={cn}
          tip={item.info}
          comments={item.comment}
          score={item.score}
          rank={item.rank}
          total={item.total}
          numberOfLines={3}
          modify={item.modify}
          isCollect={item.isCollect}
          collection={collection}
          hideScore={$.hideScore}
          showManage
          isCatalog
          isEditable={$.isSelf}
          touchPosition='inner'
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
      name={jp}
      nameCn={cn}
      cover={item.image}
      score={item.score}
      rank={item.rank}
      typeCn={item.type}
      collection={collection}
    />
  )
}

export default ob(Item, COMPONENT)
