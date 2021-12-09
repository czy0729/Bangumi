/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 20:26:15
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@screens/_'
import { _ } from '@stores'
import { c } from '@utils/decorators'
import { IOS } from '@constants'
import Tab from './tab'
import List from './list'
import { H_TABBAR } from './store'

/**
 * 因为本组件使用useMemo后不能用mobx@4去observer
 * 所以只能在上面把routes的length传下来监听刷新
 */
function TabWrap({ length }, { $ }) {
  rerender('Home.TabWrap')

  const styles = memoStyles()
  const renderScene = useMemo(() => {
    const routes = {
      all: () => <List title='全部' />,
      anime: () => <List title='动画' />,
      book: () => <List title='书籍' />
    }
    if (length === 5) {
      routes.real = () => <List title='三次元' />
      routes.game = () => (
        <>
          <List title='游戏' />
          {IOS && <BlurView style={styles.tabs4} />}
        </>
      )
    } else {
      routes.real = () => (
        <>
          <List title='三次元' />
          {IOS && <BlurView style={styles.tabs3} />}
        </>
      )
    }

    return SceneMap(routes)
  }, [styles, length])

  return <Tab routes={$.tabs} renderScene={renderScene} />
}

export default c(TabWrap)

const memoStyles = _.memoStyles(() => ({
  tabs4: {
    position: 'absolute',
    zIndex: 1,
    top: -_.statusBarHeight || 0,
    left: -_.window.width * 4,
    right: 0,
    height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0)
  },
  tabs3: {
    position: 'absolute',
    zIndex: 1,
    top: -_.statusBarHeight || 0,
    left: -_.window.width * 3,
    right: 0,
    height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0)
  }
}))
