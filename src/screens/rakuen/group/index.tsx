/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:39:02
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Heatmap, Page, Pagination, ScrollView } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Info from './component/info'
import List from './component/list'
import Header from './header'
import { useGroupPage } from './hooks'
import { HEAT_MAPS } from './ds'

/** 小组 */
const Group = (props: NavigationProps) => {
  const { id, $, fixed, onScroll } = useGroupPage(props)

  return useObserver(() => {
    const { show } = $.state
    return (
      <Component id='screen-rakuen-group'>
        <StoreContext.Provider value={id}>
          <Page statusBarEvent={false}>
            <ScrollView scrollEventThrottle={16} scrollToTop onScroll={onScroll}>
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
              style={_.mt.xs}
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
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Group
