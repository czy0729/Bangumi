/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 云文档 [WEB]: 用 iframe 渲染
 */
import { useEffect } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { useBoolean } from '@utils/hooks'
import { HTML_SINGLE_DOC } from '@constants'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 加载兜底超时 (ms) */
const LOADING_TIMEOUT = 6000

/** 云文档 iframe */
function Web({ uri }: Props) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const styles = memoStyles()

  // 切换文档时重置加载态; 正常路径以 iframe 的 onLoad 为准, 超时兜底
  useEffect(() => {
    setFalse()

    const timer = setTimeout(setTrue, LOADING_TIMEOUT)
    return () => clearTimeout(timer)
  }, [setFalse, setTrue, uri])

  return (
    <SafeAreaView style={styles.webview}>
      {!state && <Loading style={_.mt.lg} />}
      <View style={stl(styles.webview, !state && styles.hidden)}>
        <iframe
          style={{
            minHeight: _.window.height,
            border: 'none'
          }}
          src={HTML_SINGLE_DOC(uri)}
          onLoad={setTrue}
        />
      </View>
    </SafeAreaView>
  )
}

export default observer(Web)
