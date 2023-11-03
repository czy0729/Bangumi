/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 03:58:02
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import Stores, { _ } from '@stores'
import { useMount, useBoolean } from '@utils/hooks'
import { scrollToTop, useDoubleTap } from '@utils/dom'
import { StorybookPage } from './page'
import { StorybookBottomTab } from './bottom-tab'

let inited = false

export const StorybookSPA = ({ children }) => {
  // 初始化全局 Stores
  const { state, setTrue } = useBoolean(inited)
  const init = useCallback(async () => {
    if (!inited) {
      try {
        await Stores.init()
      } catch (error) {
      } finally {
        setTrue()
        inited = true
      }
    }
  }, [setTrue])
  useMount(() => {
    init()
  })

  // 全局的双击顶部区域滚动到顶
  const handleDoubleTap = useDoubleTap(() => {
    scrollToTop()
  })

  return (
    <StorybookPage>
      <View style={styles.scrollToTop} onTouchStart={handleDoubleTap} />
      {state ? children : null}
      <StorybookBottomTab />
    </StorybookPage>
  )
}

const styles = _.create({
  scrollToTop: {
    // @ts-ignore
    position: 'fixed',
    zIndex: 99999,
    top: 0,
    right: 40,
    left: 40,
    height: 16
  }
})
