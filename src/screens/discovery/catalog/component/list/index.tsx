/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 20:52:13
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Mesume, ScrollView, Text } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  return (
    <ScrollView contentContainerStyle={_.mb.md} scrollToTop>
      {!$.state.fixedFilter && <ToolBar />}
      {$.isLimit ? (
        <Flex style={styles.empty} direction='column' justify='center'>
          <Mesume size={80} />
          <Text style={[styles.text, _.mt.sm]} type='sub' size={13} lineHeight={15} align='center'>
            此功能仅对正常注册用户开放
          </Text>
        </Flex>
      ) : (
        <>
          <View style={styles.container}>
            {$.state.show &&
              (!!$.catalog._loaded && !$.catalog.list.length ? (
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
                $.catalog.list.map((item, index: number) => (
                  <>
                    <ItemCatalog
                      key={item.id}
                      event={EVENT}
                      {...item}
                      index={index}
                      filter={$.state.filterKey === '不限' ? '' : $.state.filterKey}
                    />
                    {index === 1 && <Heatmap id='目录.跳转' />}
                  </>
                ))
              ))}
          </View>
          {!$.state.fixedPagination && $.state.show && <Pagination />}
        </>
      )}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
