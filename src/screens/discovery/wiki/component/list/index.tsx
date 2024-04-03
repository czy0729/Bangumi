/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:25:20
 */
import React from 'react'
import { ScrollView } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {$.list.map((item: any, index: number) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
