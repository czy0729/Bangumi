/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:17:34
 *
 * Passkey 登录说明入口：打开打包在应用内的说明图集
 */
import { observer } from 'mobx-react'
import { Iconfont, Touchable } from '@components'
import { info, showImageViewer } from '@utils'
import { getGuideThumbs } from './utils'
import { GUIDE_IMAGES } from './ds'
import { styles } from './styles'

import type { GuideProps } from '../types'

/**
 * 说明入口
 *
 * @param disabled 认证进行中不响应点击
 */
function Guide({ disabled }: GuideProps) {
  const onPress = () => {
    const thumbs = getGuideThumbs(GUIDE_IMAGES)
    if (!thumbs.length) {
      info('说明图加载失败')

      return
    }

    showImageViewer(thumbs, 0, true, true)
    if (thumbs.length < GUIDE_IMAGES.length) info('部分说明图加载失败')
  }

  return (
    <Touchable
      style={styles.icon}
      accessibilityLabel='Passkey登录说明'
      accessibilityRole='button'
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
    >
      <Iconfont name='md-info-outline' size={14} />
    </Touchable>
  )
}

export default observer(Guide)
