/*
 * @Author: czy0729
 * @Date: 2024-05-08 01:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:16:55
 */
import React from 'react'
import { pad } from '@utils'
import { HOST_BGM_STATIC } from '@constants'
import Item from '../item'

import type { JSONGroup } from '@assets/json/types'
import type { InferArray, RenderItem } from '@types'

export function renderItem({ item }: RenderItem<InferArray<JSONGroup>>) {
  return <Item id={item.i || item.u} name={item.t} cover={getCoverById(item.i)} num={item.n} />
}

function getCoverById(id: number) {
  if (!id) return ''

  const h = String(Math.floor(id / 100))
  return `${HOST_BGM_STATIC}/pic/icon/m/000/00/${pad(h)}/${id}.jpg` as const
}
