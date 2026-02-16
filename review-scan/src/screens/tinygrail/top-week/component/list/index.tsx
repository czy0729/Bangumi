/*
 * @Author: czy0729
 * @Date: 2025-07-27 05:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-03 03:06:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { prev } = $.state
    const list = (prev ? $.topWeekHistory?.list : $.topWeek?.list) || []
    const lg = list.slice(0, 1)
    const md = list.slice(1, 3)
    const sm = list.slice(3)
    return (
      <TinygrailScrollView contentContainerStyle={_.container.bottom} onRefresh={$.fetchTopWeek}>
        <Flex wrap='wrap'>
          {!!lg?.length && (
            <View style={[styles.lg, styles.border]}>
              <Item {...lg[0]} key={lg[0].id} />
            </View>
          )}
          {!!md?.length &&
            md.map((item, index) => (
              <View style={stl(styles.md, styles.border, index && styles.side)}>
                <Item {...item} key={item.id} />
              </View>
            ))}
          {!!sm?.length &&
            sm.map((item, index) => (
              <View style={stl(styles.sm, styles.border, index % 3 && styles.side)}>
                <Item {...item} key={item.id} />
              </View>
            ))}
        </Flex>
      </TinygrailScrollView>
    )
  })
}

export default List
