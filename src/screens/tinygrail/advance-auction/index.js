/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:14:34
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
import Store, { sortDS } from './store'

class TinygrailAdvanceAuction extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { level, sort } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='拍卖推荐'
          hm={['tinygrail/advance-auction', 'TinygrailAdvanceAuction']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
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
        <Page style={this.styles.container}>
          <StatusBarEvents />
          <ToolBar
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

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailAdvanceAuction))

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
