/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:11:39
 */
import React from 'react'
import { Component } from '@components'
import { ob } from '@utils/decorators'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemSearchProps } from './types'

export { ItemSearchProps }

export const ItemSearch = ob(
  ({
    navigation,
    style,
    index,
    id,
    name,
    nameCn,
    cover,
    typeCn,
    tip,
    rank,
    score,
    total,
    comments,
    collection,
    collected,
    showManage,
    position,
    screen,
    highlight,
    event
  }: ItemSearchProps) => {
    return (
      <Component id='item-search' data-key={id}>
        <Item
          navigation={navigation}
          styles={memoStyles()}
          style={style}
          index={index}
          id={id}
          name={name}
          nameCn={nameCn}
          cover={cover}
          typeCn={typeCn}
          tip={tip}
          rank={rank}
          score={score}
          total={total}
          comments={comments}
          collection={collection}
          collected={collected}
          showManage={showManage}
          position={position}
          screen={screen}
          highlight={highlight}
          event={event}
        />
      </Component>
    )
  },
  COMPONENT
)

export default ItemSearch
