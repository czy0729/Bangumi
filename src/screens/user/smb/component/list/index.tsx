/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 21:59:19
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Filter from '../filter'
import Pagination from '../pagination'
import Top from '../top'
import Empty from './empty'
import Grids from './grids'
import Lists from './lists'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <View>
      <Top />
      <ScrollView key={$.refreshKey} contentContainerStyle={styles.scrollView}>
        {!!$.smbs.length && <Filter $={$} />}
        {$.pageList.length ? $.state.configs.layoutList ? <Lists /> : <Grids /> : <Empty />}
      </ScrollView>
      {!!$.pageList.length && <Pagination />}
    </View>
  ))
}

export default List
