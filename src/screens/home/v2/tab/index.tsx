/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 04:24:29
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import List from '../list'
import Tab from './tab'

/**
 * 因为本组件使用 useMemo 后不能用 mobx@4 去 observer
 * 所以只能在上面把 routes 的 length 传下来监听刷新
 */
export default ({ length }) => {
  // global.rerender('Home.Tab')

  const renderScene = useMemo(() => {
    const routes: Record<string, React.ComponentType> = {
      all: () => <List title='全部' />,
      anime: () => <List title='动画' />,
      book: () => <List title='书籍' />,
      real: () => <List title='三次元' />
    }
    if (length === 5) routes.game = () => <List title='游戏' />

    return SceneMap(routes)
  }, [length])

  return <Tab renderScene={renderScene} />
}
