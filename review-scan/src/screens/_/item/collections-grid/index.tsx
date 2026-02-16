/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 05:33:03
 */
import React from 'react'
import { _ } from '@stores'
import { x18 } from '@utils'
import { ob } from '@utils/decorators'
import Item from './item'
import { COMPONENT } from './ds'
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
    cdn,
    score,
    rank,
    typeCn,
    collection,
    userCollection,
    airtime,
    aid,
    wid,
    mid,
    isRectangle,
    hideScore,
    event
  }: ItemCollectionsGridProps) => {
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
        cdn={cdn !== undefined ? cdn : !x18(id)}
        score={score}
        rank={rank}
        typeCn={typeCn}
        collection={collection}
        userCollection={userCollection}
        airtime={airtime}
        aid={aid}
        wid={wid}
        mid={mid}
        isRectangle={isRectangle}
        hideScore={hideScore}
        event={event}
      />
    )
  },
  COMPONENT
)

export default ItemCollectionsGrid
