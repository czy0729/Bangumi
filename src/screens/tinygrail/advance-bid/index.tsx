/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:16:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:26:26
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { useTinygrailAdvanceBidPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 卖出推荐 */
function TinygrailAdvanceBid(props: NavigationProps) {
  const { id, $ } = useTinygrailAdvanceBidPage(props)

  return (
    <Component id='screen-tinygrail-advance-bid'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            style={_.mt._sm}
            level={$.state.level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </TinygrailPage>
        <TinygrailHeader
          title='卖出推荐'
          hm={HM}
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
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailAdvanceBid)
