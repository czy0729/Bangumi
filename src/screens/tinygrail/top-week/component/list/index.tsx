/*
 * @Author: czy0729
 * @Date: 2025-07-27 05:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-16 01:56:05
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

/** 每周萌王列表 */
function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { prev } = $.state
  const list = (prev ? $.topWeekHistory?.list : $.topWeek?.list) || []
  const lg = list.slice(0, 1)
  const md = list.slice(1, 3)
  const sm = list.slice(3)

  return (
    <TinygrailScrollView contentContainerStyle={_.container.bottom} onRefresh={$.headerRefresh}>
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
}

export default observer(List)
