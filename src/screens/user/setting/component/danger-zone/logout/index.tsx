/*
 * @Author: czy0729
 * @Date: 2026-05-05 22:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, Text } from '@components'
import { ItemSetting } from '@_'
import Stores, { _, userStore } from '@stores'
import { useNavigation } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IconLogOut } from '../../icons'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 登出 */
function Logout({ filter, setFalse }: Props) {
  const navigation = useNavigation()

  // 未登录时没有可退出的会话
  if (!userStore.isLogin) return null

  return (
    <ItemSetting
      style={_.mt.xs}
      icon={<IconLogOut color={_.colorDanger} />}
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
      hd={
        <Text type='danger' size={14} bold>
          {TEXTS.logout.hd}
        </Text>
      }
    >
      <Heatmap id='设置.退出登陆' />
    </ItemSetting>
  )
}

export default observer(Logout)
