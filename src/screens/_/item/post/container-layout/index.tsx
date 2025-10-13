/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 20:48:02
 */
import React from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { layoutHeightMap } from '../utils'
import { memoStyles } from './styles'
import { Props } from './types'

function ContainerLayout({ id, subLength, isJump, children }: Props) {
  return useObserver(() => {
    const styles = memoStyles()

    const handleLayout = (evt: LayoutChangeEvent) => {
      if (subLength) {
        layoutHeightMap.set(Number(id), evt.nativeEvent.layout.height)
      }
    }

    return (
      <Flex
        style={stl(_.container.block, isJump && styles.itemJump)}
        align='start'
        onLayout={handleLayout}
      >
        {children}
      </Flex>
    )
  })
}

export default ContainerLayout
