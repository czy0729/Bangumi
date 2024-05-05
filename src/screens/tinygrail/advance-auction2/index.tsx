/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:09:12
 */
import React from 'react'
import { Header, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import ToolBar from '@tinygrail/_/tool-bar'
import List from './list'
import Store, { sortDS } from './store'
import { Ctx } from './types'

/** 拍卖推荐 B */
class TinygrailAdvanceAuction2 extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  render() {
    const { $ } = this.context as Ctx
    const { level, sort } = $.state
    return (
      <>
        <Header
          title='拍卖推荐 B'
          hm={['tinygrail/advance-auction2', 'TinygrailAdvanceAuction2']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
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
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            level={level}
            levelMap={$.levelMap}
            data={sortDS}
            sort={sort}
            direction={sort ? 'down' : undefined}
            onLevelSelect={$.onLevelSelect}
            onSortPress={$.onSortPress}
          />
          <List />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailAdvanceAuction2))
