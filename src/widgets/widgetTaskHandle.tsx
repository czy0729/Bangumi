/*
 * @Author: czy0729
 * @Date: 2023-05-22 19:17:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 14:07:11
 */
import React from 'react'
import type { WidgetTaskHandlerProps } from 'react-native-android-widget'
import Today from './today'
import getTodayData from './today/utils'
import { TODAY_WIDGET_NAME } from './ds'

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const { widgetAction, widgetInfo, renderWidget } = props
  const { widgetName } = widgetInfo
  console.log({
    widgetAction,
    widgetName
  })

  if (widgetName === TODAY_WIDGET_NAME) {
    const value = await getTodayData()
    renderWidget(<Today {...value} />)
  }

  // switch (widgetAction) {
  //   case 'WIDGET_RESIZED':
  //     break

  //   case 'WIDGET_ADDED':
  //     break

  //   case 'WIDGET_CLICK':
  //     break

  //   default:
  //     break
  // }
}
