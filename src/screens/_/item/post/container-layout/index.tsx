/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:31:44
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { layoutHeightMap } from '../utils'
import { memoStyles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

function ContainerLayout({ id, subLength, isJump, children }: Props) {
  const styles = memoStyles()

  const handleLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      if (subLength) {
        layoutHeightMap.set(Number(id), evt.nativeEvent.layout.height)
      }
    },
    [id, subLength]
  )

  return (
    <Flex
      style={stl(_.container.block, isJump && styles.itemJump)}
      align='start'
      onLayout={handleLayout}
    >
      {children}
    </Flex>
  )
}

export default observer(ContainerLayout)
