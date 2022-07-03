/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:16:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:20:24
 */
import React from 'react'
import { Header, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { alert } from '@utils/ui'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from '@tinygrail/_/tool-bar'
import List from './list'
import Store from './store'

class TinygrailAdvanceBid extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { level } = $.state
    return (
      <>
        <StatusBarEvents />
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
        <Page style={this.styles.container}>
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

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailAdvanceBid))

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
