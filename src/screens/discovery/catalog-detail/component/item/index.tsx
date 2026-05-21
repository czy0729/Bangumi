/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:14:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:27:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { _, collectionStore, subjectStore, useStore } from '@stores'
import { findSubjectCn } from '@utils'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ index, item }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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

  const styles = memoStyles()

  return (
    <ItemCollectionsGrid
      style={index % $.gridNum === 0 && styles.side}
      index={index}
      id={id}
      num={$.gridNum}
      name={jp}
      nameCn={cn}
      cover={item.image}
      score={item.score}
      rank={item.rank}
      typeCn={item.type}
      collection={collection}
      event={EVENT}
    />
  )
}

export default observer(Item)
