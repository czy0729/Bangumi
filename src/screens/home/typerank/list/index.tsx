/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-03 04:14:36
 */
import React from 'react'
import { View } from 'react-native'
import { Empty, Loading, ScrollView } from '@components'
import { ItemSubject } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '分类排行.跳转'
} as const

function List(props, { $, navigation }: Ctx) {
  if (!$.ids.length) return <Empty text='此标签没有足够的列表数据' />

  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  return (
    <ScrollView
      contentContainerStyle={_.container.bottom}
      keyboardDismissMode='on-drag'
      onScroll={$.onScroll}
    >
      <View style={styles.list}>
        {$.ids.map((item, index) => (
          <ItemSubject
            key={item}
            navigation={navigation}
            event={EVENT}
            index={index}
            subjectId={item}
            type={$.type}
            subject={$.subject(item)}
            oss={$.subjectOSS(item)}
            active={$.subjectId == item}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default obc(List)
