/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:48:43
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Heatmap, Flex, Mesume, Text } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Filter from '../filter'
import Pagination from '../pagination'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '目录.跳转'
} as const

function List(props, { $ }: Ctx) {
  const { show, filterKey, fixedPagination, fixedFilter } = $.state
  const { list, _loaded } = $.catalog
  return (
    <ScrollView contentContainerStyle={_.mb.md} scrollToTop>
      {!fixedFilter && <Filter />}
      {$.isLimit ? (
        <Flex style={styles.empty} direction='column' justify='center'>
          <Mesume size={80} />
          <Text
            style={[styles.text, _.mt.sm]}
            type='sub'
            size={13}
            lineHeight={15}
            align='center'
          >
            此功能仅对正常注册用户开放
          </Text>
        </Flex>
      ) : (
        <>
          <View style={styles.container}>
            {show &&
              (!!_loaded && !list.length ? (
                <Flex style={styles.empty} direction='column' justify='center'>
                  <Mesume size={80} />
                  <Text
                    style={[styles.text, _.mt.sm]}
                    type='sub'
                    size={13}
                    lineHeight={15}
                    align='center'
                  >
                    到底了
                  </Text>
                </Flex>
              ) : (
                list.map((item, index: number) => (
                  <>
                    <ItemCatalog
                      key={item.id}
                      event={EVENT}
                      {...item}
                      filter={filterKey === '不限' ? '' : filterKey}
                    />
                    {index === 1 && <Heatmap id='目录.跳转' />}
                  </>
                ))
              ))}
          </View>
          {!fixedPagination && show && <Pagination />}
        </>
      )}
    </ScrollView>
  )
}

export default obc(List)
