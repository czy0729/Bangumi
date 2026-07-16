/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:47:44
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, systemStore, useStore } from '@stores'
import { getKeyString, keyExtractor } from '@utils'
import { MODEL_COLLECTION_STATUS, USE_NATIVE_DRIVER } from '@constants'
import FixedToolBar from '../../component/fixed-tool-bar'
import Item from '../../component/item'
import Loading from '../../component/loading'
import Pagination from '../../component/pagination'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ page, title, scrollY, onScroll, onRefreshOffset }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchIsNeedToEnd(true), [$])

  const handleScroll = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ],
        {
          useNativeDriver: USE_NATIVE_DRIVER,
          listener: onScroll
        }
      ),
    [onScroll, scrollY]
  )

  const handleRef = useCallback(
    (ref: { scrollToIndex: any; scrollToOffset: any }) => {
      $.forwardRef(ref, page)
    },
    [$, page]
  )

  const handleRenderItem = useCallback(
    ({ item, index }) => <Item item={item} index={index} page={page} />,
    [page]
  )

  const handleLayout = useCallback(() => {
    onRefreshOffset(page)

    requestAnimationFrame(() => {
      onRefreshOffset(page)
    })
  }, [onRefreshOffset, page])

  if (!$.state._loaded) return <Loading />

  const { subjectType, list } = $.state
  const userCollections = $.userCollections(
    subjectType,
    MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
  )
  if (!userCollections._loaded) return <Loading />

  const { userPagination, userGridNum } = systemStore.setting
  const num = Number(userGridNum) + (_.isLandscape ? 1 : 0)
  const numColumns = list ? undefined : num

  const { page: pageCurrent, pageTotal } = userCollections.pagination
  const styles = memoStyles()

  const ListHeaderComponent = (
    <>
      <View style={styles.header} />
      <FixedToolBar
        page={page}
        pageCurrent={pageCurrent}
        pageTotal={pageTotal}
        onRefreshOffset={onRefreshOffset}
      />
    </>
  )

  const passProps: any = {}
  if (userPagination) {
    passProps.ListFooterComponent = <Pagination pageTotal={pageTotal} />
  } else {
    passProps.onHeaderRefresh = handleHeaderRefresh
    passProps.onFooterRefresh = $.fetchUserCollections
  }

  return (
    <ListView
      key={getKeyString(_.orientation, subjectType, userGridNum, list)}
      ref={handleRef}
      keyExtractor={keyExtractor}
      style={styles.listView}
      contentContainerStyle={list ? styles.list : styles.grid}
      animated
      data={userCollections}
      numColumns={numColumns}
      progressViewOffset={_.parallaxImageHeight + 32}
      keyboardDismissMode='on-drag'
      renderItem={handleRenderItem}
      ListHeaderComponent={ListHeaderComponent}
      scrollEventThrottle={16}
      onLayout={handleLayout}
      onScroll={handleScroll}
      {...passProps}
    />
  )
}

export default observer(List)
