/*
 * @Author: czy0729
 * @Date: 2019-11-20 17:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 09:33:45
 */
import React from 'react'
import { Component, Flex, Header, Loading, Page, Text } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Chart from './chart'
import { useTinygrailTreePage } from './hooks'
import ToolBar from './tool-bar'

/** 资产分析 */
const TinygrailTree = (props: NavigationProps) => {
  const { id, $, refreshing, handleRefresh, handleShowMenu, handleAlert } =
    useTinygrailTreePage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-tree'>
      <StoreContext.Provider value={id}>
        <Header
          title={$.params?.name || '资产分析'}
          alias='资产分析'
          hm={['tinygrail/tree', 'TinygrailTree']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <Flex>
              {refreshing ? (
                <Text style={_.mr.sm} type='tinygrailPlain' size={12}>
                  请求中...
                </Text>
              ) : (
                <IconHeader
                  style={_.mr.sm}
                  name='md-refresh'
                  color={_.colorTinygrailPlain}
                  size={22}
                  onPress={handleRefresh}
                />
              )}
              <IconHeader
                name='md-info-outline'
                color={_.colorTinygrailPlain}
                onPress={handleAlert}
              />
            </Flex>
          )}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar style={_.mt._sm} />
          {$.state.loading ? (
            <Loading style={_.container.tinygrail} color={_.colorTinygrailText} />
          ) : (
            <Chart
              data={$.state.data}
              caculateType={$.state.caculateType}
              isTemple={$.isTemple}
              onPress={handleShowMenu}
              onLongPress={$.onToggleItem}
            />
          )}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTree
