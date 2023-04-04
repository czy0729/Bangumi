/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 01:33:32
 */
import React from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { STORYBOOK_HEIGHT, STORYBOOK_WIDTH } from '@constants'
import { ScrollView } from '../scroll-view'

export const StorybookList = ({ style = undefined, children, ...other }) => {
  return (
    <ScrollView
      style={stl(styles.scrollView, style)}
      contentContainerStyle={styles.container}
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
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  container: {
    paddingVertical: _._wind
  }
})
