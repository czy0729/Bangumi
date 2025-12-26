/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:15:33
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {$.list.map((item: any, index: number) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  ))
}

export default List
