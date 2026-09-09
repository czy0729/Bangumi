/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:45:39
 */
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {$.list.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default observer(List)
