/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 00:01:41
 */
import React from 'react'
import { Component } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { alert } from '@utils/ui'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { useTinygrailAdvanceAskPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 买入推荐 */
const TinygrailAdvanceAsk = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceAskPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-ask'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            level={$.state.level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </TinygrailPage>
        <TinygrailHeader
          title='买入推荐'
          hm={HM}
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('卖一推荐.提示')

                alert(
                  '从活跃列表里面查找\n第一卖单股数 > 10 且 Max(流动股息, 圣殿股息) > 4\nMax(流动股息, 圣殿股息) / 第一卖单价 * 10 = 分数',
                  '当前计算方式'
                )
              }}
            />
          )}
        />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailAdvanceAsk
