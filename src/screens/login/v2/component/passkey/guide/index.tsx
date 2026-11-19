/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 00:00:00
 *
 * Passkey 登录说明入口：打开在线教程文档
 */
import { observer } from 'mobx-react'
import { Iconfont, Touchable } from '@components'
import { open } from '@utils'
import { GUIDE_URL } from './ds'
import { styles } from './styles'

import type { GuideProps } from '../types'

/**
 * 说明入口
 *
 * @param disabled 认证进行中不响应点击
 */
function Guide({ disabled }: GuideProps) {
  return (
    <Touchable
      style={styles.icon}
      accessibilityLabel='Passkey登录说明'
      accessibilityRole='button'
      disabled={disabled}
      onPress={disabled ? undefined : () => open(GUIDE_URL)}
    >
      <Iconfont name='md-info-outline' size={18} />
    </Touchable>
  )
}

export default observer(Guide)
