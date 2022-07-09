/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:59:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 12:12:31
 */
import React, { useEffect, useState, useCallback } from 'react'
import { DataProvider, LayoutProvider } from 'recyclerlistview'
import { _ } from '@stores'
import { Flex } from '../flex'
// import { devLog } from '../dev'
import { toJS } from 'mobx'
import { VIEW_TYPES, REFRESH_STATE } from './ds'
import { sleep } from '@utils'
import { ListEmpty } from '@types'

export function useRecycler({ data, keyExtractor, ListHeaderComponent, renderItem }) {
  const [layoutProvider] = useState(
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
          dim.height = 100
        }
      }
    )
  )

  const [dataProvider, setData] = useState(
    new DataProvider((a, b) => {
      return keyExtractor(a) !== keyExtractor(b)
    }).cloneWithRows(getData(data, ListHeaderComponent))
  )

  const rowRenderer = useCallback(
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
    setData(prevState => prevState.cloneWithRows(getData(data, ListHeaderComponent)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._loaded, data.list.length])

  return {
    layoutProvider,
    dataProvider,
    rowRenderer
  }
}

export function useFooterRefresh({ data, onFooterRefresh }) {
  const [refreshState, setRefreshState] = useState(getRefreshState(data))

  const onEndReached = useCallback(async () => {
    if (refreshState !== REFRESH_STATE.Idle) return

    setRefreshState(REFRESH_STATE.FooterRefreshing)
    await sleep(400)
    onFooterRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshState])

  useEffect(() => {
    setRefreshState(getRefreshState(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._loaded, data.list.length])

  return {
    refreshState,
    onEndReachedThresholdRelative: 80,
    onEndReachedThreshold: 80,
    onEndReached
  }
}

export function getData(data, ListHeaderComponent) {
  if (ListHeaderComponent) {
    return [
      {
        id: VIEW_TYPES.HEADER
      },
      ...toJS(data.list)
    ]
  }

  return toJS(data.list)
}

function getRefreshState(data: ListEmpty) {
  const { list, pagination, _loaded } = data
  let initRefreshState
  if (!_loaded) {
    initRefreshState = REFRESH_STATE.Idle
  } else if (list.length === 0) {
    initRefreshState = REFRESH_STATE.EmptyData
  } else if (pagination.page < pagination.pageTotal) {
    initRefreshState = REFRESH_STATE.Idle
  } else {
    initRefreshState = REFRESH_STATE.NoMoreData
  }
  return initRefreshState
}
