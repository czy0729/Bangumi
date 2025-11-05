/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:57:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:06:50
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx, Data } from '../../types'
import Item from '../item'
import Type from '../type'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ data }: { data: Data }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { type } = $.state
  return (
    <View style={styles.container}>
      <Type />
      <ScrollView
        key={type}
        style={_.mt.md}
        contentContainerStyle={styles.list}
        onScroll={$.onScroll}
      >
        {data
          .filter(item => {
            const isCatalog = item.title.includes('【目录】')
            return type === '目录' ? isCatalog : !isCatalog
          })
          .map((item, index) => (
            <Item key={item.topicId} item={item} index={index} />
          ))}
      </ScrollView>
    </View>
  )
}

export default ob(List, COMPONENT)
