/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 19:54:57
 */

import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { layoutHeightMap } from '../utils'
import { memoStyles } from './styles'

function ContainerLayout({ id, subLength, isJump, children }) {
  const styles = memoStyles()
  return (
    <Flex
      style={stl(_.container.block, isJump && styles.itemJump)}
      align='start'
      onLayout={
        subLength
          ? e => {
              layoutHeightMap.set(Number(id), e.nativeEvent.layout.height)
            }
          : undefined
      }
    >
      {children}
    </Flex>
  )
}

export default ob(ContainerLayout)
