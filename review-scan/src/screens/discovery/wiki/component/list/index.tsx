/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:15:33
 */
import React from 'react'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {$.list.map((item: any, index: number) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
