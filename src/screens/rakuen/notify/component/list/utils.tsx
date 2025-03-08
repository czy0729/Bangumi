/*
 * @Author: czy0729
 * @Date: 2024-01-18 04:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:52:47
 */
import React from 'react'
import ItemNotify from '../item-notify'
import ItemPM from '../item-pm'

export function keyExtractor(item: any, index: number) {
  return `${JSON.stringify(item)}|${index}`
}

export function renderNotifyItem({ item, index }) {
  return <ItemNotify item={item} index={index} />
}

export function renderPmInItem({ item, index }) {
  return <ItemPM id='pmIn' item={item} index={index} />
}

export function renderPmOutItem({ item, index }) {
  return <ItemPM id='pmOut' item={item} index={index} />
}
