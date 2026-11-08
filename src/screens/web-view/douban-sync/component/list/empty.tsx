/*
 * @Author: czy0729
 * @Date: 2026-11-07 19:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:00:00
 *
 * 列表空态: 未填写 ID 时给出步骤, 已填写无数据给原因说明
 */
import { observer } from 'mobx-react'
import { EmptyGuide } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ListEmpty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { hide } = $.state
  const { doubanId } = $

  if (doubanId) {
    return (
      <EmptyGuide
        title='已填写 ID，但没有获取到数据'
        description='请打开窗口后重新获取，或确认该账号下有公开的影视收藏'
        buttonText={hide ? '重新获取数据' : undefined}
        onPress={$.onToggleHide}
      />
    )
  }

  return (
    <EmptyGuide
      title='还没有获取到影视数据'
      steps={[
        '①: 点击下方按钮打开窗口',
        '②: 填写用户空间地址或 ID',
        '③: 点击「重新获取数据」等待读取'
      ]}
      buttonText={hide ? '填写用户 ID' : undefined}
      onPress={$.onToggleHide}
    />
  )
}

export default observer(ListEmpty)
