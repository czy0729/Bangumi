/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 10:51:54
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@_'
import { _ } from '@stores'
import { IOS, RAKUEN_TYPE } from '@constants'
import List from '../list'
import { memoStyles } from './styles'

export const TABS = RAKUEN_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

export const renderScene = SceneMap(
  Object.assign(
    {},
    ...TABS.map((item, index) => ({
      [item.key]: () =>
        index === TABS.length - 1 ? (
          <>
            <List index={index} />
            {IOS && (
              <BlurView
                style={[
                  memoStyles().blurView,
                  {
                    left: -_.window.width * TABS.length
                  }
                ]}
              />
            )}
          </>
        ) : (
          <List index={index} />
        )
    }))
  )
)
