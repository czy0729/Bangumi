/*
 * @Author: czy0729
 * @Date: 2019-05-25 23:00:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 06:15:34
 */
import React from 'react'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemCollectionsProps } from './types'

export type { ItemCollectionsProps }

export function ItemCollections({
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
  isCollect,
  isCatalog,
  isEditable,
  event,
  filter,
  showManage,
  touchPosition,
  active,
  onEdit
}: ItemCollectionsProps) {
  r(COMPONENT)

  return useObserver(() => (
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
      isCollect={isCollect}
      isCatalog={isCatalog}
      isEditable={isEditable}
      event={event}
      filter={filter}
      showManage={showManage}
      touchPosition={touchPosition}
      active={active}
      onEdit={onEdit}
    />
  ))
}

export default ItemCollections
