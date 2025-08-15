/*
 * @Author: czy0729
 * @Date: 2024-05-08 01:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:32:39
 */
import React from 'react'
import { pad } from '@utils'
import Item from '../item'

export function renderItem({ item }) {
  return <Item id={item.i || item.u} name={item.t} cover={getCoverById(item.i)} num={item.n} />
}

function getCoverById(id: number) {
  if (!id) return ''

  const h = String(Math.floor(id / 100))
  return `https://lain.bgm.tv/pic/icon/m/000/00/${pad(h)}/${id}.jpg`
}
