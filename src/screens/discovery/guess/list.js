/*
 * @Author: czy0729
 * @Date: 2022-01-09 13:36:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 17:55:10
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { Pagination } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  const { page, rendered } = $.state
  if (!rendered) return null
  return (
    <ScrollView style={_.mt._sm} contentContainerStyle={_.container.bottom} scrollToTop>
      <View style={styles.container}>
        {$.list.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </View>
      <Pagination
        style={_.mt.md}
        input={String(page)}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
      />
    </ScrollView>
  )
}

export default obc(List)

const styles = _.create({
  container: {
    minHeight: _.window.height
  }
})
