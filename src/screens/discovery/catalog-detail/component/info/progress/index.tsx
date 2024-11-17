/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:22:34
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { Progress as ProgressComp } from '@_'
import { userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Progress() {
  const { $ } = useStore<Ctx>()
  const { progress } = $.detail
  const [current, total] = String(progress || '').split('/')
  if (!userStore.isLogin || !(current || total)) return null

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

export default ob(Progress, COMPONENT)
