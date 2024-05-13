/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:57:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:13:01
 */
import React from 'react'
import { ScrollView } from '@components'
import { ob } from '@utils/decorators'
import { Navigation } from '@types'
import { Data } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ navigation, data }: { navigation: Navigation; data: Data }) {
  const styles = memoStyles()
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {data.map((item, index) => (
        <Item key={item.topicId} navigation={navigation} item={item} index={index} />
      ))}
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
