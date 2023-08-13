/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:16:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:09:35
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
import Store from './store'
import { Ctx } from './types'

class TinygrailAdvanceBid extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  render() {
    const { $ } = this.context as Ctx
    const { level } = $.state
    return (
      <>
        <Header
          title='卖出推荐'
          hm={['tinygrail/advance-bid', 'TinygrailAdvanceBid']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
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
        <Page style={_.container.tinygrail}>
          <ToolBar
            style={_.mt._sm}
            level={level}
            levelMap={$.levelMap}
            onLevelSelect={$.onLevelSelect}
          />
          <List />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailAdvanceBid))
