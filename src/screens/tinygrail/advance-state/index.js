/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 18:28:34
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

class TinygrailAdvanceState extends React.Component {
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
          title='低价股'
          hm={['tinygrail/advance-state', 'TinygrailAdvanceState']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('低价股.提示')

                alert('在英灵殿里面查找当前价 <= 16 的角色, 获取卖一价', '当前计算方式')
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

export default inject(Store)(obc(TinygrailAdvanceState))

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
