/*
 * @Author: czy0729
 * @Date: 2026-08-25 02:51:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-25 02:51:00
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'

import type { Props } from './types'

/** 区块锚点: 注册 View ref, 供滚动定位到指定区块使用 */
function BlockAnchor({ title, onBlockRef, style }: Props) {
  const handleBlockRef = useCallback((ref: View) => onBlockRef(ref, title), [onBlockRef, title])

  return <View ref={handleBlockRef} style={stl(_.container.layout, style)} collapsable={false} />
}

export default observer(BlockAnchor)
