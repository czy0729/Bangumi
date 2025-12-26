/*
 * @Author: czy0729
 * @Date: 2019-11-20 17:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:51:05
 */
import React from 'react'
import { Component, Loading, Text } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import Chart from './chart'
import { useTinygrailTreePage } from './hooks'
import ToolBar from './tool-bar'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 资产分析 */
const TinygrailTree = (props: NavigationProps) => {
  const { id, $, refreshing, handleRefresh, handleShowMenu, handleAlert } =
    useTinygrailTreePage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-tree'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <ToolBar />
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
        </TinygrailPage>
        <TinygrailHeader
          title={$.params?.name || '资产分析'}
          alias='资产分析'
          hm={HM}
          headerRight={() => (
            <>
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
            </>
          )}
        />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTree
