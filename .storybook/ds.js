/*
 * @Author: czy0729
 * @Date: 2023-11-02 15:07:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 22:06:38
 */
import Provider from '@ant-design/react-native/lib/provider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppCommon } from '@_/base/app-common'
import theme from '@styles/theme'
import { styles } from './styles'

export const parameters = {
  options: {
    title: 'Bangumi 番组计划'
  },
  darkMode: {
    current: 'dark',
    darkClass: 'dark',
    classTarget: 'html',
    stylePreview: true
  },
  actions: {
    argTypesRegex: '^on[A-Z].*'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  Story => (
    <Provider theme={theme}>
      <GestureHandlerRootView style={styles.container}>
        <Story />
        <AppCommon />
      </GestureHandlerRootView>
    </Provider>
  )
]
