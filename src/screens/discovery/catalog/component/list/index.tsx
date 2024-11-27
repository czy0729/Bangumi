/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:07:16
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Mesume, ScrollView, Text } from '@components'
import { ItemCatalog } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  if ($.isLimit) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume size={80} />
        <Text style={styles.text} type='sub' size={13} lineHeight={15} align='center'>
          此功能仅对正常注册用户开放
        </Text>
      </Flex>
    )
  }

  const { fixedFilter, fixedPagination, show } = $.state
  const { list, _loaded } = $.catalog
  const elToolBar = <ToolBar />
  const elPagination = <Pagination />
  return (
    <>
      {fixedFilter && <View style={styles.fixedToolBar}>{elToolBar}</View>}
      <ScrollView
        contentContainerStyle={!fixedFilter && styles.contentContainerStyle}
        onScroll={$.onScroll}
      >
        {!fixedFilter && elToolBar}
        <View style={styles.container}>
          {show &&
            (!!_loaded && !list.length ? (
              <Flex style={styles.empty} direction='column' justify='center'>
                <Mesume size={80} />
                <Text style={styles.text} type='sub' size={13} lineHeight={15} align='center'>
                  到底了
                </Text>
              </Flex>
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

export default ob(List, COMPONENT)
