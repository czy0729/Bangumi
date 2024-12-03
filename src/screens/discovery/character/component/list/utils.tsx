/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:14:44
 */
import React from 'react'
import Item from '../item'
import ItemRecents from '../item-recents'

export function renderItem({ item, index }) {
  return <Item index={index} id={item.id} avatar={item.avatar} name={item.name} />
}

export function renderItemRecents({ item, index }) {
  return (
    <ItemRecents
      index={index}
      id={item.id}
      cover={item.cover}
      name={item.name}
      nameJP={item.nameJP}
      type={item.type}
      info={item.info}
      star={item.star}
      starInfo={item.starInfo}
      actors={item.actors}
    />
  )
}
