/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 07:02:48
 */
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  r(COMPONENT)

  return <TinygrailTabs routes={TABS} renderItem={renderItem} />
}

export default observer(Tabs)
