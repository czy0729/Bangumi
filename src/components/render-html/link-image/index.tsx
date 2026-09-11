/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:23:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:23:50
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { open, stl } from '@utils'
import { flexItemStyle, flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function LinkImage({ style, src }: Props) {
  if (typeof src !== 'string') return null

  const styles = memoStyles()
  const ext = src.includes('.jpg')
    ? 'JPG'
    : src.includes('.png')
    ? 'PNG'
    : src.includes('.gif')
    ? 'GIF'
    : 'IMG'

  return (
    <Touchable
      style={stl(flexStyle(), styles.content, style, styles.img)}
      onPress={() => {
        open(src)
      }}
    >
      <Text style={flexItemStyle()} type='sub' size={12} numberOfLines={1}>
        [{ext}] {src}
      </Text>
      <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} />
    </Touchable>
  )
}

export default observer(LinkImage)
