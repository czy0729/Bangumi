/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:35:35
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_IFRAME, STORYBOOK_WIDTH } from '@constants'
import { Flex } from '../flex'
import { StorybookPageProps } from './types'

export const StorybookPage = ({
  style,
  container,
  wind,
  space,
  radius,
  children,
  ...other
}: StorybookPageProps) => {
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

const width = STORYBOOK_WIDTH + (STORYBOOK_IFRAME ? 4 : 0)

const styles = _.create({
  view: {
    width,
    maxWidth: width
  },
  container: {
    paddingHorizontal: '8%'
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.md
  },
  radius: {
    width,
    maxWidth: width,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
})
