/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 23:58:17
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import Stores, { _ } from '@stores'
import { useMount, useBoolean } from '@utils/hooks'
import { scrollToTop } from '@utils/dom'
import { StorybookPage } from './page'
import { StorybookBottomTab } from './bottom-tab'

let inited = false

export const StorybookSPA = ({ children }) => {
  const ref = useRef(null)

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
    ref.current.classList.add('component-storybook-spa-top')
  })

  // 全局的双击顶部区域滚动到顶
  // const handleDoubleTap = useDoubleTap(() => {
  //   scrollToTop()
  // })

  return (
    <StorybookPage>
      <View
        ref={ref}
        style={styles.scrollToTop}
        // onTouchStart={handleDoubleTap}
        // @ts-ignore 电脑端只点击一下就生效
        onClick={scrollToTop}
      />
      {state ? children : null}
      <StorybookBottomTab />
    </StorybookPage>
  )
}

const styles = _.create({
  scrollToTop: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    right: 40,
    left: 40,
    height: 20,
    borderBottomRightRadius: _.radiusMd,
    borderBottomLeftRadius: _.radiusMd,
    overflow: 'hidden',
    cursor: 'pointer'
  }
})
