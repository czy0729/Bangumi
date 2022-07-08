/*
 * @Author: czy0729
 * @Date: 2022-07-07 09:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-07 10:28:38
 */
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import { Flex } from '@components'
import { renderItem } from '../../home/v2/list/utils'

const { width } = Dimensions.get('window')

const rowRenderer = (type, data, index) => {
  return (
    <Flex.Item>
      {renderItem({
        item: data,
        index
      })}
    </Flex.Item>
  )
}

const layoutProvider = new LayoutProvider(
  () => {
    return 0
  },
  (type, dim) => {
    dim.width = width
    dim.height = 0
  }
)

const dataProvider = new DataProvider((a, b) => {
  return a.subject_id !== b.subject_id
})

function List({ list }) {
  const [data, setData] = useState(dataProvider)

  useEffect(() => {
    setData(dataProvider.cloneWithRows(list))
  }, [list])

  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={data}
      rowRenderer={rowRenderer}
      forceNonDeterministicRendering
      showsVerticalScrollIndicator={false}
      overScrollMode='never'
    />
  )
}

export default List
