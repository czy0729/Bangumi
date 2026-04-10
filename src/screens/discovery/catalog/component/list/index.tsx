/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 23:55:06
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Empty, ScrollView } from '@components'
import { ItemCatalog } from '@_'
import { useStore } from '@stores'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])
  const elPagination = useMemo(() => <Pagination />, [])

  const { fixedFilter, fixedPagination, show } = $.state
  const { list, _loaded } = $.catalog

  return (
    <>
      {fixedFilter && elToolBar}
      <ScrollView onScroll={$.onScroll}>
        {!fixedFilter && elToolBar}
        <View style={styles.container}>
          {show &&
            (!!_loaded && !list.length ? (
              <Empty text='到底了' />
            ) : (
              list.map((item, index: number) => (
                <ItemCatalog
                  key={item.id}
                  event={EVENT}
                  {...item}
                  index={index}
                  filter={$.state.filterKey === '不限' ? '' : $.state.filterKey}
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
