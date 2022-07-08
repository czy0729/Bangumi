/*
 * @Author: czy0729
 * @Date: 2022-07-07 20:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 07:54:05
 */
import React from 'react'
import { Todo } from '../todo'
import { ListViewRecyclerProps } from './types'

export { ListViewRecyclerProps }

export function ListViewRecycler({
  data,
  keyExtractor,
  renderItem,
  ListHeaderComponent
}: ListViewRecyclerProps) {
  return (
    <Todo
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}
