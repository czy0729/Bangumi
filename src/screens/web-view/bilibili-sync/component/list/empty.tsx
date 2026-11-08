/*
 * @Author: czy0729
 * @Date: 2026-11-07 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:00:00
 *
 * 列表空态: 区分未检查 / 未登录 / 已登录无数据
 */
import { observer } from 'mobx-react'
import { EmptyGuide } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ListEmpty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { isLogin, hide } = $.state

  if (isLogin === true) {
    return (
      <EmptyGuide
        title='已登录 bilibili，但没有读取到数据'
        description='请打开登录框后重新获取，或确认账号下有追番记录'
        buttonText={hide ? '重新获取数据' : undefined}
        onPress={$.onToggleHide}
      />
    )
  }

  if (isLogin === false) {
    return (
      <EmptyGuide
        title='还没有登录 bilibili，暂未获取到数据'
        steps={[
          '①: 点击下方按钮打开登录框',
          '②: 在打开的网页内登录 bilibili 账号',
          '③: 登录后等待数据自动读取'
        ]}
        buttonText={hide ? '登录 bilibili' : undefined}
        onPress={$.onToggleHide}
      />
    )
  }

  return (
    <EmptyGuide
      title='还没有获取到 bilibili 追番数据'
      description='打开登录框后会自动检查登录状态并读取数据'
      buttonText={hide ? '打开登录框' : undefined}
      onPress={$.onToggleHide}
    />
  )
}

export default observer(ListEmpty)
