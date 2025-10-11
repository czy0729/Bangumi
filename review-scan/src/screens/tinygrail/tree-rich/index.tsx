/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:52:18
 */
import React from 'react'
import { Component, HeaderV2, Loading, Page, Text } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Chart from './chart'
import { useTinygrailTreeRichPage } from './hooks'
import ToolBar from './tool-bar'
import { HM } from './ds'

/** 前百首富 */
const TinygrailTreeRich = (props: NavigationProps) => {
  const { id, $, refreshing, handleRefresh, handleShowMenu } = useTinygrailTreeRichPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-tree-rich'>
      <StoreContext.Provider value={id}>
        <Page style={[_.container.tinygrail, _.container.header]}>
          <ToolBar />
          {$.state.loading ? (
            <Loading style={_.container.tinygrail} color={_.colorTinygrailText} />
          ) : (
            <Chart data={$.state.data} onPress={handleShowMenu} onLongPress={$.onToggleItem} />
          )}
        </Page>
        <HeaderV2
          backgroundStyle={_.container.tinygrail}
          title='前百首富'
          hm={HM}
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
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTreeRich
