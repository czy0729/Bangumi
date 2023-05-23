/*
 * @Author: czy0729
 * @Date: 2023-05-22 19:19:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 11:31:06
 */
import { registerRootComponent } from 'expo'
import { registerWidgetTaskHandler } from 'react-native-android-widget'
import { widgetTaskHandler } from './src/widgets/widgetTaskHandle'
import App from './src/widgets'

registerRootComponent(App)
registerWidgetTaskHandler(widgetTaskHandler)
