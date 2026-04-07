/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:12:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-11 05:41:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { InView } from '@_'
import { memoStyles } from './styles'

function Container({ width, height, y, children }) {
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
      <InView y={y}>{children}</InView>
    </Flex>
  )
}

export default observer(Container)
