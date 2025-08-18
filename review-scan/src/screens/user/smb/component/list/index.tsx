/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:07:28
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import Pagination from '../pagination'
import Top from '../top'
import Empty from './empty'
import Grids from './grids'
import Lists from './lists'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <View style={_.container.header}>
      <Top />
      <ScrollView key={$.refreshKey} contentContainerStyle={styles.scrollView}>
        {!!$.smbs.length && <Filter $={$} />}
        {$.pageList.length ? $.state.configs.layoutList ? <Lists /> : <Grids /> : <Empty />}
      </ScrollView>
      {!!$.pageList.length && <Pagination />}
    </View>
  )
}

export default ob(List, COMPONENT)
