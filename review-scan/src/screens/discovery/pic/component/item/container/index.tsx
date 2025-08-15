/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:12:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 02:34:50
 */
import React from 'react'
import { Flex } from '@components'
import { InView } from '@_'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function Container({ width, height, y, children }) {
  return useObserver(() => {
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
  })
}

export default Container
