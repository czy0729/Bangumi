/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:51:19
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_HEIGHT, STORYBOOK_WIDTH, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { StorybookListProps } from './types'

export const StorybookList = ({
  style,
  wind,
  space,
  children,
  ...other
}: StorybookListProps) => {
  return (
    <ScrollView
      style={stl(styles.scrollView, style)}
      contentContainerStyle={stl(wind && styles.wind, space && styles.space)}
      {...other}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      {children}
    </ScrollView>
  )
}

const styles = _.create({
  scrollView: {
    width: STORYBOOK_WIDTH + 4,
    height: STORYBOOK_HEIGHT,
    backgroundColor: _.colorPlain,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.md
  }
})
