/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 09:50:21
 */
import React from 'react'
import { Component, Header, Loading, Page, Text } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Chart from './chart'
import { useTinygrailTreeRichPage } from './hooks'
import ToolBar from './tool-bar'

/** 前百首富 */
const TinygrailTreeRich = (props: NavigationProps) => {
  const { id, $, refreshing, handleRefresh, handleShowMenu } = useTinygrailTreeRichPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-tree-rich'>
      <StoreContext.Provider value={id}>
        <Header
          title='前百首富'
          hm={['tinygrail/tree-rich', 'TinygrailTreeRich']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() =>
            refreshing ? (
              <Text style={_.mr.xs} type='tinygrailPlain' size={12}>
                请求中...
              </Text>
            ) : (
              <IconHeader
                style={_.mr.xs}
                name='md-refresh'
                size={22}
                color={_.colorTinygrailPlain}
                onPress={handleRefresh}
              />
            )
          }
        />
        <Page style={_.container.tinygrail}>
          <ToolBar />
          {$.state.loading ? (
            <Loading style={_.container.tinygrail} color={_.colorTinygrailText} />
          ) : (
            <Chart data={$.state.data} onPress={handleShowMenu} onLongPress={$.onToggleItem} />
          )}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTreeRich
