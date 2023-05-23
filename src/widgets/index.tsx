/*
 * @Author: czy0729
 * @Date: 2023-05-22 19:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 14:58:28
 */
import * as React from 'react'
import { View } from 'react-native'
import { WidgetPreview } from 'react-native-android-widget'
import { DEV, devLog } from '@components'
import { ignoreAllLogs } from './utils'
import { WIDGET_HEIGHT, WIDGET_WIDTH } from './ds'
import { styles } from './styles'

import Widget from './today'
import getData from './today/utils'

// import { setStorage } from './utils'
// setTimeout(() => {
//   setStorage(TODAY_WIDGET_KEY, 'magma')
//   console.log('setStorage')
// }, 4000)

ignoreAllLogs()

export default function App() {
  const [data, setData] = React.useState(null)
  const getValue = React.useCallback(async () => {
    const data = await getData()
    setData(data)
    devLog(data)
  }, [])

  React.useEffect(() => {
    getValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => (data ? <Widget {...data} /> : null)}
        width={WIDGET_WIDTH}
        height={WIDGET_HEIGHT}
      />
      <DEV />
    </View>
  )
}
