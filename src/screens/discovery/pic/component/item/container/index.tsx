/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:12:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 22:03:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { InView } from '@_'
import { _ } from '@stores'
import { memoStyles } from './styles'

import type { Props } from './types'

function Container({ width, height, y, children }: Props) {
  const styles = memoStyles()

  return (
    <Flex
      style={[
        styles.item,
        {
          width,
          height
        }
      ]}
      justify='center'
    >
      <InView y={y - _.window.height}>{children}</InView>
    </Flex>
  )
}

export default observer(Container)
