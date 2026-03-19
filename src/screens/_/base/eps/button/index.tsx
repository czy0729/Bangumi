/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:59:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:38:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import Button from './button'
import { memoStyles } from './styles'

function ButtonWrap(props) {
  return <Button styles={memoStyles()} heatMap={systemStore.setting.heatMap} {...props} />
}

export default observer(ButtonWrap)
