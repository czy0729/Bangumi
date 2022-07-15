/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 18:06:33
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@_'
import { c } from '@utils/decorators'
import { IOS } from '@constants'
import Tab from '../tab'
import List from '../list'
import { memoStyles } from './styles'

/**
 * 因为本组件使用useMemo后不能用mobx@4去observer
 * 所以只能在上面把routes的length传下来监听刷新
 */
function TabWrap({ length }, { $ }) {
  global.rerender('Home.TabWrap')

  const styles = memoStyles()
  const renderScene = useMemo(() => {
    const routes: Record<string, React.ComponentType> = {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length])

  return <Tab routes={$.tabs} renderScene={renderScene} />
}

export default c(TabWrap)
