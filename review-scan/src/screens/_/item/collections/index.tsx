/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:07:44
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCollectionsProps } from './types'

export { ItemCollectionsProps }

export const ItemCollections = ob(
  ({
    navigation,
    index,
    inViewY,
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
    cover,
    type,
    modify,
    numberOfLines,
    showLabel,
    hideScore,
    relatedId,
    isDo,
    isOnHold,
    isDropped,
    isCollect,
    isCatalog,
    isEditable,
    event,
    filter,
    showManage,
    touchPosition,
    onEdit
  }: ItemCollectionsProps) => {
    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        index={index}
        inViewY={inViewY}
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
        cover={cover}
        type={type}
        numberOfLines={numberOfLines}
        modify={modify}
        showLabel={showLabel}
        hideScore={hideScore}
        relatedId={relatedId}
        isDo={isDo}
        isOnHold={isOnHold}
        isDropped={isDropped}
        isCollect={isCollect}
        isCatalog={isCatalog}
        isEditable={isEditable}
        event={event}
        filter={filter}
        showManage={showManage}
        touchPosition={touchPosition}
        onEdit={onEdit}
      />
    )
  },
  COMPONENT
)

export default ItemCollections
