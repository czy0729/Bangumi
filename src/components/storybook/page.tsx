/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:01:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_WIDTH } from '@constants'

export const StorybookPage = ({
  style = undefined,
  container = false,
  wind = false,
  space = false,
  radius = false,
  children,
  ...other
}) => {
  return (
    <Flex
      style={stl(
        styles.view,
        container && styles.container,
        wind && styles.wind,
        space && styles.space,
        style
      )}
      justify='center'
      {...other}
    >
      {radius ? <View style={styles.radius}>{children}</View> : children}
    </Flex>
  )
}

const styles = _.create({
  view: {
    width: STORYBOOK_WIDTH,
    maxWidth: STORYBOOK_WIDTH
  },
  container: {
    paddingHorizontal: '8%'
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.sm
  },
  radius: {
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
})
