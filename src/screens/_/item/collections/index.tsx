/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:25:55
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Item from './item'
import { memoStyles } from './styles'
import { Props as ItemCollectionsProps } from './types'

export { ItemCollectionsProps }

export const ItemCollections = ob(
  ({
    navigation,
    id,
    name,
    nameCn,
    tip,
    rank,
    score,
    tags,
    comments,
    time,
    collection,
    userCollection,
    cover,
    type,
    modify,
    showLabel,
    hideScore,
    isDo,
    isOnHold,
    isDropped,
    isCollect,
    isCatalog,
    isEditable,
    event,
    onEdit
  }: ItemCollectionsProps) => {
    global.rerender('Component.ItemCollections')

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        id={id}
        name={name}
        nameCn={nameCn}
        tip={tip}
        rank={rank}
        score={score}
        tags={tags}
        comments={comments}
        time={time}
        collection={collection}
        userCollection={userCollection}
        cover={cover}
        type={type}
        modify={modify}
        showLabel={showLabel}
        hideScore={hideScore}
        isDo={isDo}
        isOnHold={isOnHold}
        isDropped={isDropped}
        isCollect={isCollect}
        isCatalog={isCatalog}
        isEditable={isEditable}
        event={event}
        onEdit={onEdit}
      />
    )
  }
)
