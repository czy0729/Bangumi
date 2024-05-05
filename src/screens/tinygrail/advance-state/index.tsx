/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:01:05
 */
import React from 'react'
import { Header, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { alert } from '@utils/ui'
import ToolBar from '@tinygrail/_/tool-bar'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 低价股 */
class TinygrailAdvanceState extends React.Component {
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

export default inject(Store)(obc(TinygrailAdvanceState))
