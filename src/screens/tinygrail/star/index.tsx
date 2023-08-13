/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:13:16
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import ToolBar from './tool-bar'
import List from './list'
import Logs from './logs'
import Store from './store'
import { Ctx } from './types'

class TinygrailStar extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  render() {
    return (
      <>
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
