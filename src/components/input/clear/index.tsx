/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:20:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 15:00:00
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { styles } from './styles'

import type { Props } from './types'

function Clear({ colorClear, multiline, onPress }: Props) {
  // iOS 使用原生清空按钮
  if (IOS) return null

  return (
    <Touchable
      style={stl(
        flexStyle({ justify: 'center' }),
        multiline ? styles.closeMultiline : styles.close,
        styles.icon
      )}
      onPress={onPress}
    >
      <Iconfont name='md-close' size={16} color={colorClear || _.colorSub} />
    </Touchable>
  )
}

export default observer(Clear)
