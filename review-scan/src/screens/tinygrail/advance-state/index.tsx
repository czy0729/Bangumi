/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:16:20
 */
import React from 'react'
import { Component, HeaderV2, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { alert } from '@utils/ui'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailAdvanceStatePage } from './hooks'
import List from './list'
import { HM } from './ds'

/** 低价股 */
const TinygrailAdvanceState = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceStatePage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-state'>
      <StoreContext.Provider value={id}>
        <Page style={[_.container.tinygrail, _.container.header]}>
          <ToolBar
            style={_.mt._sm}
            level={$.state.level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </Page>
        <HeaderV2
          backgroundStyle={_.container.tinygrail}
          title='低价股'
          hm={HM}
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
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailAdvanceState
