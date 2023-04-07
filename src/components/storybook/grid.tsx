/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:06:45
 */
import React from 'react'
import { Flex } from '../flex'
import { StorybookList } from './list'

export const StorybookGrid = ({
  style = undefined,
  wind = undefined,
  space = undefined,
  children,
  ...other
}) => {
  return (
    <StorybookList style={style} wind={wind} space={space}>
      <Flex wrap='wrap' align='start' {...other}>
        {children}
      </Flex>
    </StorybookList>
  )
}
