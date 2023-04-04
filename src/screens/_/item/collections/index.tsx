/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 08:06:44
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
    total,
    simpleStars,
    tags,
    comments,
    time,
    collection,
    userCollection,
    cover,
    type,
    modify,
    numberOfLines,
    showLabel,
    hideScore,
    isDo,
    isOnHold,
    isDropped,
    isCollect,
    isCatalog,
    isEditable,
    event,
    filter,
    showManage,
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
        total={total}
        simpleStars={simpleStars}
        tags={tags}
        comments={comments}
        time={time}
        collection={collection}
        userCollection={userCollection}
        cover={cover}
        type={type}
        numberOfLines={numberOfLines}
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
        filter={filter}
        showManage={showManage}
        onEdit={onEdit}
      />
    )
  }
)
