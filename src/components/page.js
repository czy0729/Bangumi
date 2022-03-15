/*
 * @Author: czy0729
 * @Date: 2021-12-07 07:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 03:19:03
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Loading } from './loading'

export const Page = observer(({ style, loaded, loadingColor, children, ...other }) => {
  const _style = [_.container.plain, style]
  if (loaded || loaded === undefined)
    return (
      <View style={_style} {...other}>
        {children}
      </View>
    )

  return <Loading style={_style} color={loadingColor} />
})
