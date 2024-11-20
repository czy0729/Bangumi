/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:16:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 07:32:05
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailAdvanceBidPage } from './hooks'
import List from './list'

/** 卖出推荐 */
const TinygrailAdvanceBid = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceBidPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-bid'>
      <StoreContext.Provider value={id}>
        <Header
          title='卖出推荐'
          hm={['tinygrail/advance-bid', 'TinygrailAdvanceBid']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('买一推荐.提示')

                alert(
                  '从持仓列表里面查找\n第一买单股数 > 0\n第一买单价 / Math.min(500, rank) 时的实际股息 = 分数',
                  '当前计算方式'
                )
              }}
            />
          )}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            level={$.state.level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailAdvanceBid
