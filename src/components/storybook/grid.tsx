/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:58:52
 */
import React from 'react'
import { Flex } from '../flex'
import { StorybookList } from './list'
import { StorybookGridProps } from './types'

export const StorybookGrid = ({
  style,
  wind,
  space,
  children,
  ...other
}: StorybookGridProps) => {
  return (
    <StorybookList style={style} wind={wind} space={space}>
      <Flex wrap='wrap' align='start' {...other}>
        {children}
      </Flex>
    </StorybookList>
  )
}
