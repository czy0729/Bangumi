/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 03:39:54
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Heatmap, Page, Pagination, ScrollView } from '@components'
import { useOnScroll } from '@components/header/utils'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Info from './info'
import List from './list'
import Store from './store'
import { styles } from './styles'
import { Ctx } from './types'

const HEAT_MAPS = {
  prev: '小组.上一页',
  next: '小组.下一页',
  search: '小组.页码跳转'
} as const

/** 小组 */
const RakuenGroup = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  return useObserver(() => {
    const { show } = $.state
    return (
      <Component id='screen-rakuen-group'>
        <Page statusBarEvent={false}>
          <ScrollView scrollEventThrottle={4} scrollToTop onScroll={onScroll}>
            <Info />
            {show && (
              <View
                style={[
                  {
                    minHeight: _.window.height
                  },
                  _.mt.md
                ]}
              >
                <List />
              </View>
            )}
          </ScrollView>
          <Pagination
            style={styles.pagination}
            input={$.state.ipt}
            heatmaps={HEAT_MAPS}
            onPrev={$.prev}
            onNext={$.next}
            onChange={$.onChange}
            onSearch={$.doSearch}
          />
        </Page>
        <Header fixed={fixed} />
        <Heatmap id='小组' screen='Group' />
        <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
        <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
      </Component>
    )
  })
}

export default ic(Store, RakuenGroup)
