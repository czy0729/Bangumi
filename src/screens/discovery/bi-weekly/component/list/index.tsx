/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:57:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 12:12:47
 */
import React from 'react'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx, Data } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ data }: { data: Data }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <ScrollView contentContainerStyle={styles.list} onScroll={$.onScroll}>
      {data.map((item, index) => (
        <Item key={item.topicId} item={item} index={index} />
      ))}
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
