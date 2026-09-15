/*
 * @Author: czy0729
 * @Date: 2023-12-12 04:53:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:20:36
 */
import { _ } from '@stores'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { getTierRadius } from '../utils'

import type { Props as SquircleProps } from '../types'

function Radius({ style, width, height, radius, children }: SquircleProps) {
  let borderRadius: number

  if (radius === true || !radius) {
    // 档位阈值与 getRadius 共用一处实现, 这里的小值取 _.radiusXs
    borderRadius = getTierRadius(Math.max(width, height), _.radiusXs)
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
