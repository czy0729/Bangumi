/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:06:00
 */
import React from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_HEIGHT, STORYBOOK_WIDTH } from '@constants'
import { ScrollView } from '../scroll-view'

export const StorybookList = ({
  style = undefined,
  wind = false,
  space = false,
  children,
  ...other
}) => {
  return (
    <ScrollView
      style={stl(styles.scrollView, style)}
      contentContainerStyle={stl(wind && styles.wind, space && styles.space)}
      {...other}
    >
      {children}
    </ScrollView>
  )
}

const styles = _.create({
  scrollView: {
    width: STORYBOOK_WIDTH,
    height: STORYBOOK_HEIGHT,
    maxHeight: '96%',
    backgroundColor: _.colorBg,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.sm
  }
})
