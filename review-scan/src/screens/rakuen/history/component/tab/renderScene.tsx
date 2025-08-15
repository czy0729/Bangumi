/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-01 19:36:36
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import FavorList from '../favor-list'
import HotList from '../hot-list'
import LocalList from '../local-list'
import ReplyList from '../reply-list'

export default SceneMap({
  reply: () => <ReplyList />,
  favor: () => <FavorList />,
  hot: () => <HotList />,
  local: () => <LocalList />
})
