/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 07:40:23
 */
import React from 'react'
import Ep from '../ep'
import Item from '../item'
import Mono from '../mono'

export function renderItem({ index, item }) {
  return <Item index={index} item={item} />
}

export function renderMonoItem({ index, item }) {
  return <Mono index={index} item={item} />
}

export function renderEpItem({ index, item }) {
  return <Ep index={index} item={item} />
}
