/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 07:09:12
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  r(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  return (
    <TinygrailTabs routes={TABS} renderContentHeaderComponent={elToolBar} renderItem={renderItem} />
  )
}

export default observer(Tabs)
