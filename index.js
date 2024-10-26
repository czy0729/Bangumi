/*
 * @Author: czy0729
 * @Date: 2024-10-27 04:59:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-10-27 04:59:42
 */
import { registerRootComponent } from 'expo'

import App from './src/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
