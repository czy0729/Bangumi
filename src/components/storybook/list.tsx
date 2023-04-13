/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:53:17
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import {
  STORYBOOK_HEIGHT,
  STORYBOOK_WIDTH,
  SCROLL_VIEW_RESET_PROPS,
  STORYBOOK_IFRAME
} from '@constants'
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
    height: STORYBOOK_HEIGHT,
    backgroundColor: _.colorPlain,
    overflow: 'hidden',
    ...(STORYBOOK_IFRAME
      ? {
          width: STORYBOOK_WIDTH + 4,
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.64)',
          borderRadius: _.radiusMd
        }
      : {
          width: STORYBOOK_WIDTH
        })
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.md
  }
})
