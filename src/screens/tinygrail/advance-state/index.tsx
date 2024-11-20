/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:01:05
 */
import React from 'react'
import { Component, Header, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { alert } from '@utils/ui'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailAdvanceStatePage } from './hooks'
import List from './list'

/** 低价股 */
const TinygrailAdvanceState = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceStatePage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-state'>
      <StoreContext.Provider value={id}>
        <Header
          title='低价股'
          hm={['tinygrail/advance-state', 'TinygrailAdvanceState']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('低价股.提示')

                alert('在英灵殿里面查找当前价 <= 16 的角色, 获取卖一价', '当前计算方式')
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

export default TinygrailAdvanceState
