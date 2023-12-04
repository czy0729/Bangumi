/*
 * @Author: czy0729
 * @Date: 2023-04-04 21:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:18:24
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Component } from '../../component'
import { styles } from './styles'
import { Props as StorybookListProps } from './types'

/** [WEB] 单页面列表容器 */
export const StorybookList = ({
  style,
  wind,
  space,
  children,
  ...other
}: StorybookListProps) => {
  return (
    <Component id='component-storybook-list'>
      <ScrollView
        style={stl(styles.scrollView, style)}
        contentContainerStyle={stl(wind && styles.wind, space && styles.space)}
        {...other}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {children}
      </ScrollView>
    </Component>
  )
}
