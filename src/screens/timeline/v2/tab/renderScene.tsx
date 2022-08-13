/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 07:16:01
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@_'
import { _ } from '@stores'
import { IOS } from '@constants'
import List from '../list'
import { ROUTES } from './ds'
import { memoStyles } from './styles'

export default SceneMap(
  Object.assign(
    {},
    ...ROUTES.map((item, index) => ({
      [item.key]: () =>
        index === ROUTES.length - 1 ? (
          <>
            <List title={`${item.title}`} />
            {IOS && (
              <BlurView
                style={[
                  memoStyles().blurView,
                  {
                    left: -_.window.width * ROUTES.length
                  }
                ]}
              />
            )}
          </>
        ) : (
          <List title={`${item.title}`} />
        )
    }))
  )
)
