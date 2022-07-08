/*
 * @Doc: https://github.com/Flipkart/recyclerlistview
 * @Author: czy0729
 * @Date: 2022-07-07 21:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 09:03:06
 */
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
// import isEqual from 'lodash.isequal'
import { _ } from '@stores'
import { Flex } from '../flex'
import { VIEW_TYPES, getData } from './utils'
import { ListViewRecyclerProps } from './types'

export { ListViewRecyclerProps }

const Dimension = {
  width: _.window.width,
  height: _.window.height
}

function ListViewRecycler({
  data,
  keyExtractor,
  renderItem,
  ListHeaderComponent,
  onScroll,
  ...other
}: ListViewRecyclerProps) {
  const layoutProvider = useRef(
    new LayoutProvider(
      index => {
        if (ListHeaderComponent && index === 0) return VIEW_TYPES.HEADER
        return VIEW_TYPES.ROW
      },
      (type, dim) => {
        dim.width = _.window.width
        if (type === VIEW_TYPES.HEADER) {
          dim.height = _.window.height
        } else {
          dim.height = 0
        }
      }
    )
  )
  const dataProvider = useRef(
    new DataProvider((a, b) => {
      return keyExtractor(a) !== keyExtractor(b)
    })
  )
  const [_dataProvider, setData] = useState(
    dataProvider.current.cloneWithRows(getData(data, ListHeaderComponent))
  )
  const _rowRenderer = useCallback(
    (type, data, index) => {
      if (type === VIEW_TYPES.HEADER) {
        return <Flex.Item>{ListHeaderComponent}</Flex.Item>
      }

      return (
        <Flex.Item>
          {renderItem({
            item: data,
            index
          })}
        </Flex.Item>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    setData(_dataProvider.cloneWithRows(getData(data, ListHeaderComponent)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._loaded || data.list.length])

  return (
    <RecyclerListView
      layoutProvider={layoutProvider.current}
      dataProvider={_dataProvider}
      rowRenderer={_rowRenderer}
      forceNonDeterministicRendering
      renderAheadOffset={_.window.height}
      initialRenderIndex={0}
      layoutSize={Dimension}
      ListHeaderComponent={ListHeaderComponent}
      onScroll={onScroll}
      {...other}
      showsVerticalScrollIndicator={false}
      overScrollMode='never'
    />
  )
}

export { ListViewRecycler }
