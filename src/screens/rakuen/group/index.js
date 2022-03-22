/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-23 01:27:46
 */
import React from 'react'
import { View } from 'react-native'
import { Page, ScrollView, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { Pagination } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Info from './info'
import List from './list'
import Store from './store'

const heatmaps = {
  prev: '小组.上一页',
  next: '小组.下一页',
  search: '小组.页码跳转'
}

const RakuenGroup = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  const { y, fixed, onScroll } = useOnScroll()
  return useObserver(() => {
    const { show } = $.state
    return (
      <>
        <Header y={y} fixed={fixed} />
        <Page>
          <ScrollView
            contentContainerStyle={_.container.bottom}
            scrollEventThrottle={16}
            scrollToTop
            onScroll={onScroll}
          >
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
            heatmaps={heatmaps}
            onPrev={$.prev}
            onNext={$.next}
            onChange={$.onChange}
            onSearch={$.doSearch}
          />
        </Page>
        <Heatmap id='小组' screen='Group' />
        <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
        <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
      </>
    )
  })
}

export default ic(Store, RakuenGroup)

const styles = _.create({
  pagination: {
    paddingVertical: _.sm
  }
})
