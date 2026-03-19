/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:47:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { r } from '@utils/dev'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemSearchProps } from './types'
export type { ItemSearchProps }

export const ItemSearch = observer(
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
    showManage,
    position,
    screen,
    highlight,
    event
  }: ItemSearchProps) => {
    r(COMPONENT)

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
          showManage={showManage}
          position={position}
          screen={screen}
          highlight={highlight}
          event={event}
        />
      </Component>
    )
  }
)

export default ItemSearch
