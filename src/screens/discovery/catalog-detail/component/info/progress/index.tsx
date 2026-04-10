/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 01:30:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Progress as ProgressComp } from '@_'
import { userStore, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Progress() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!userStore.isLogin) return null

  const { progress } = $.detail
  const [current, total] = String(progress || '').split('/')
  if (!(current || total)) return null

  return (
    <View>
      <ProgressComp current={Number(current || 0)} total={Number(total || 0)}>
        <Text type='sub' size={12} bold>
          完成度 {current} / {total}
        </Text>
      </ProgressComp>
    </View>
  )
}

export default observer(Progress)
