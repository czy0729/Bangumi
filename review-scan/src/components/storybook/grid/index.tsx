/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:01:00
 */
import React from 'react'
import { r } from '@utils/dev'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { StorybookList } from '../list'
import { COMPONENT } from './ds'
import { Props as StorybookGridProps } from './types'

/** [WEB] 单页面网格列表容器 */
export const StorybookGrid = ({ style, wind, space, children, ...other }: StorybookGridProps) => {
  r(COMPONENT)

  return (
    <Component id='component-storybook-grid'>
      <StorybookList style={style} wind={wind} space={space}>
        <Flex wrap='wrap' align='start' {...other}>
          {children}
        </Flex>
      </StorybookList>
    </Component>
  )
}

export default StorybookGrid
