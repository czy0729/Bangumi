/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:32:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 01:36:02
 */
import React from 'react'
import { Flex } from '../flex'
import { StorybookList } from './list'

export const StorybookGrid = ({ children, ...other }) => {
  return (
    <StorybookList {...other}>
      <Flex wrap='wrap' align='start'>
        {children}
      </Flex>
    </StorybookList>
  )
}
