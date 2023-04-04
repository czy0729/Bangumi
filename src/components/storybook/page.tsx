/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 02:46:18
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_WIDTH } from '@constants'

export const StorybookPage = ({ style = undefined, children, ...other }) => {
  return (
    <Flex style={stl(styles.view, style)} {...other}>
      <Flex.Item>{children}</Flex.Item>
    </Flex>
  )
}

const styles = _.create({
  view: {
    width: STORYBOOK_WIDTH,
    maxWidth: STORYBOOK_WIDTH
  }
})
