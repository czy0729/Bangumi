/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 21:52:33
 */
import React from 'react'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { StorybookList } from '../list'
import { Props as StorybookGridProps } from './types'

export const StorybookGrid = ({
  style,
  wind,
  space,
  children,
  ...other
}: StorybookGridProps) => {
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
