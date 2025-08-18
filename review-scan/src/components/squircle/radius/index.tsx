/*
 * @Author: czy0729
 * @Date: 2023-12-12 04:53:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 05:28:55
 */
import React from 'react'
import { _ } from '@stores'
import { Component } from '../../component'
import { Flex } from '../../flex'

function Radius({ style, width, height, radius, children }) {
  let borderRadius: number
  if (radius === true || !radius) {
    const size = Math.max(width, height)
    if (size >= 80) {
      borderRadius = _.radiusMd
    } else if (size >= 40) {
      borderRadius = _.radiusSm
    } else {
      borderRadius = _.radiusXs
    }
  } else {
    borderRadius = radius
  }

  return (
    <Component style={style} id='component-squircle'>
      <Flex
        style={{
          borderRadius,
          overflow: 'hidden'
        }}
      >
        {children}
      </Flex>
    </Component>
  )
}

export default Radius
