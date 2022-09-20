/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 11:59:48
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Item from './item'
import { Props as ItemCollectionsGridProps } from './types'

export { ItemCollectionsGridProps }

export const ItemCollectionsGrid = ob(
  ({
    navigation,
    style,
    num = 3,
    id,
    name,
    nameCn,
    sub,
    cover,
    score,
    rank,
    typeCn,
    collection,
    userCollection,
    airtime,
    aid,
    wid,
    mid,
    isCollect,
    isRectangle,
    event
  }: ItemCollectionsGridProps) => {
    global.rerender('Component.ItemCollectionsGrid')

    return (
      <Item
        navigation={navigation}
        style={style}
        gridStyles={_.grid(num)}
        id={id}
        name={name}
        nameCn={nameCn}
        sub={sub}
        cover={cover}
        score={score}
        rank={rank}
        typeCn={typeCn}
        collection={collection}
        userCollection={userCollection}
        airtime={airtime}
        aid={aid}
        wid={wid}
        mid={mid}
        isCollect={isCollect}
        isRectangle={isRectangle}
        event={event}
      />
    )
  }
)
