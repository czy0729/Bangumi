/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:03:43
 */
import React from 'react'
import { Component } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { useTinygrailAdvanceAuction2Page } from './hooks'
import List from './list'
import { SORT_DS } from './store'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 拍卖推荐 B */
const TinygrailAdvanceAuction2 = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceAuction2Page(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-auction-2'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <TinygrailToolBar
            style={_.mt._sm}
            level={$.state.level}
            levelMap={$.levelMap}
            data={SORT_DS}
            sort={$.state.sort}
            direction={$.state.sort ? 'down' : undefined}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </TinygrailPage>
        <TinygrailHeader
          title='拍卖推荐 B'
          hm={HM}
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('竞拍推荐.提示', {
                  type: 2
                })

                alert(
                  '从英灵殿里面查找前 2000 条\n数量 > 80\n若当前 rank > 500 按 500 时的实际股息 / 竞拍底价 * 100 = 分数',
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

export default TinygrailAdvanceAuction2
