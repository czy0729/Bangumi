/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:27:03
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function ToolBarIcon({ icon, iconStyle, iconSize = 19, iconColor, onSelect }: Props) {
  const styles = memoStyles()

  return (
    <Touchable
      style={stl(flexStyle({ justify: 'center' }), styles.iconTouch, styles.iconItem)}
      onPress={onSelect}
    >
      {!!icon && (
        <View style={iconStyle}>
          <Iconfont name={icon} size={iconSize} color={iconColor} />
        </View>
      )}
    </Touchable>
  )
}

export default observer(ToolBarIcon)
