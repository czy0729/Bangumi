/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-15 18:17:31
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@_'
import { _ } from '@stores'
import { IOS } from '@constants'
import List from '../list'
import { TABS } from '../ds'
import { styles } from './styles'

export const renderScene = SceneMap(
  Object.assign(
    {},
    ...TABS.map((item, index) => ({
      [item.key]: () => {
        if (index === TABS.length - 1) {
          return (
            <>
              <List index={index} />
              {IOS && (
                <BlurView
                  style={[
                    styles.blurView,
                    {
                      left: -_.window.width * TABS.length
                    }
                  ]}
                />
              )}
            </>
          )
        }

        return <List index={index} />
      }
    }))
  )
)
