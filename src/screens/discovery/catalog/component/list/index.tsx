/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:38:27
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Empty, ScrollView } from '@components'
import { ItemCatalog } from '@_'
import { useStore } from '@stores'
import { DATA_CATALOG_TYPE_MAP } from '@constants'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  // --- Data Logic ---
  const { fixedFilter, fixedPagination, show, filterKey } = $.state
  const { list, _loaded: isLoaded } = $.catalog

  // --- Memos (Elements) ---
  const elToolBar = useMemo(() => <ToolBar />, [])
  const elPagination = useMemo(() => <Pagination />, [])

  // --- Render ---
  const styles = memoStyles()

  return (
    <>
      {fixedFilter && elToolBar}
      <ScrollView onScroll={$.onScroll}>
        {!fixedFilter && elToolBar}
        <View style={styles.container}>
          {show &&
            (!!isLoaded && !list.length ? (
              <Empty text='到底了' />
            ) : (
              list
                .filter(item => {
                  const total = Object.keys(DATA_CATALOG_TYPE_MAP).reduce((sum, key) => {
                    const v = item[key] || 0
                    return sum + v
                  }, 0)
                  return !!total
                })
                .map((item, index: number) => (
                  <ItemCatalog
                    key={item.id}
                    event={EVENT}
                    {...item}
                    index={index}
                    filter={filterKey === '不限' ? '' : filterKey}
                  />
                ))
            ))}
        </View>
        {!fixedPagination && show && elPagination}
      </ScrollView>
      {fixedPagination && elPagination}
    </>
  )
}

export default observer(List)
