/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:49:35
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from './tool-bar'
import List from './list'
import Logs from './logs'
import Store from './store'
import { Ctx } from './types'

class TinygrailStar extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  render() {
    return (
      <>
        <StatusBarEvents />
        <Page style={_.container.tinygrail}>
          <ToolBar />
          <List />
          <Logs />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailStar))
