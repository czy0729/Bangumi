/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:02:07
 */
import React from 'react'
import { Component, HeaderV2, Page } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailAdvanceAuctionPage } from './hooks'
import List from './list'
import { SORT_DS } from './store'
import { HM } from './ds'

/** 拍卖推荐 */
const TinygrailAdvanceAuction = (props: NavigationProps) => {
  const { id, $ } = useTinygrailAdvanceAuctionPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-advance-auction'>
      <StoreContext.Provider value={id}>
        <Page style={[_.container.tinygrail, _.container.header]}>
          <ToolBar
            level={$.state.level}
            levelMap={$.levelMap}
            data={SORT_DS}
            sort={$.state.sort}
            direction={$.state.sort ? 'down' : undefined}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </Page>
        <HeaderV2
          backgroundStyle={_.container.tinygrail}
          title='拍卖推荐'
          hm={HM}
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('竞拍推荐.提示', {
                  type: 1
                })

                alert(
                  '从英灵殿里面查找前 2000 条\n可竞拍数量 > 80, \n实时股息 / 竞拍底价 * 100 = 分数',
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

export default TinygrailAdvanceAuction
