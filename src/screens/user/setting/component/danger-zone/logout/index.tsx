/*
 * @Author: czy0729
 * @Date: 2026-05-05 22:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 17:23:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import Stores, { _ } from '@stores'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 登出 */
function Logout({ navigation, filter, setFalse }: Props) {
  return (
    <ItemSetting
      style={_.mt.xs}
      arrow
      highlight
      filter={filter}
      onPress={() => {
        t('设置.退出登陆')

        setFalse()

        setTimeout(() => {
          Stores.logout(navigation)
        }, 160)
      }}
      {...TEXTS.logout}
    >
      <Heatmap id='设置.退出登陆' />
    </ItemSetting>
  )
}

export default observer(Logout)
