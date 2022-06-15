/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 12:08:05
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Item from './item'
import { memoStyles } from './styles'
import { Props as ItemSearchProps } from './types'

export { ItemSearchProps }

export const ItemSearch = ob(
  ({
    navigation,
    style,
    id,
    name,
    nameCn,
    cover,
    type,
    typeCn,
    tip,
    rank,
    score,
    total,
    comments,
    collection,
    collected,
    position,
    event
  }: ItemSearchProps) => {
    global.rerender('Component.ItemSearch')

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        style={style}
        id={id}
        name={name}
        nameCn={nameCn}
        cover={cover}
        type={type}
        typeCn={typeCn}
        tip={tip}
        rank={rank}
        score={score}
        total={total}
        comments={comments}
        collection={collection}
        collected={collected}
        position={position}
        event={event}
      />
    )
  }
)
