/*
 * @Author: czy0729
 * @Date: 2020-10-06 16:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:19:48
 */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@screens/_'
import { _ } from '@stores'
import { IOS } from '@constants'
import Tab from './tab'
import List from './list'
import { H_TABBAR } from './store'

/**
 * 因为本组件使用useMemo后不能用mobx@4去observer
 * 所以只能在上面把routes的length传下来监听刷新
 */
function TabWrap({ length }, { $ }) {
  const renderScene = useMemo(
    () =>
      length === 5
        ? SceneMap({
            all: () => <List title='全部' />,
            anime: () => <List title='动画' />,
            book: () => <List title='书籍' />,
            real: () => <List title='三次元' />,
            game: () => (
              <>
                <List title='游戏' />
                {IOS && (
                  <BlurView
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 0,
                      left: -_.window.width * 4,
                      right: 0,
                      height: _.headerHeight + H_TABBAR
                    }}
                  />
                )}
              </>
            )
          })
        : SceneMap({
            all: () => <List title='全部' />,
            anime: () => <List title='动画' />,
            book: () => <List title='书籍' />,
            real: () => (
              <>
                <List title='三次元' />
                {IOS && (
                  <BlurView
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 0,
                      left: -_.window.width * 3,
                      right: 0,
                      height: _.headerHeight + H_TABBAR
                    }}
                  />
                )}
              </>
            )
          }),
    [length]
  )
  return <Tab routes={$.tabs} renderScene={renderScene} />
}

TabWrap.contextTypes = {
  $: PropTypes.object
}

export default TabWrap
