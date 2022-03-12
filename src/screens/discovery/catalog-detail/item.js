/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 16:33:22
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'

const event = {
  id: '目录详情.跳转'
}

function Item({ index = 0, item }, { $, navigation }) {
  const id = String(item.id).match(/\d+/)[0]
  const nameCn = findSubjectCn(item.title, item.id)
  const collection = $.userCollectionsMap[id]
  if ($.isList) {
    return (
      <ItemCollections
        navigation={navigation}
        event={event}
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
      >
        {!index && <Heatmap id='目录详情.跳转' />}
      </ItemCollections>
    )
  }

  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      num={$.gridNum}
      name={item.title}
      nameCn={nameCn}
      cover={item.image}
      score={item.score}
      rank={item.rank}
      type={item.type}
      collection={collection}
    />
  )
}

export default obc(Item)
