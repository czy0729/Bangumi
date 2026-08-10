/*
 * @Author: czy0729
 * @Date: 2026-08-10 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 11:00:00
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components/component'
import { Flex } from '@components/flex'
import { getTimestamp, stl } from '@utils'
import { getStatusByLast } from '../utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function UserStatusViewComponent({ style, lastTS, mini = false, children }: Props) {
  // 显示信息只依赖 lastTS, 不变时不重复计算
  const status = useMemo(() => getStatusByLast(lastTS, getTimestamp()), [lastTS])

  // 超过 7 天视为离线, 不显示徽标
  if (!status.show) return <>{children}</>

  // 样式依赖主题(mode/colorWarning 等 mobx 值), 故组件用 observer 而非 memo, 主题切换时才能重渲染
  const styles = memoStyles()

  const type = status.type

  return (
    <Component id='component-user-status'>
      <View>
        {children}
        <Flex
          style={stl(styles.wrap, mini && styles.wrapMini, style)}
          justify='center'
          pointerEvents='none'
        >
          <View
            style={stl(
              styles.badge,
              mini && styles.badgeMini,
              type === 'warning' && styles.badgeWarning,
              type === 'disabled' && styles.badgeDisabled
            )}
          />
        </Flex>
      </View>
    </Component>
  )
}

const UserStatusView = observer(UserStatusViewComponent)

export default UserStatusView
