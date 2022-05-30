/*
 * @Author: czy0729
 * @Date: 2022-05-30 09:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 10:16:24
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ToolBar from './tool-bar'

function FixedToolBar({ fixed, page, onToggleList }, { $ }) {
  // 显示容器外固定工具条
  if (fixed) {
    if ($.state.fixed) {
      return (
        <View style={styles.fixed}>
          <ToolBar page={$.state.page} onToggleList={$.onToggleList} />
        </View>
      )
    }

    return null
  }

  // 固定的时候, 容器内工具条不渲染, 显示占位
  if ($.state.fixed) {
    return <View style={styles.placeholder} />
  }

  // 非固定的时候, 容器内工具条
  return <ToolBar page={page} onToggleList={onToggleList} />
}

export default obc(FixedToolBar)

const styles = _.create({
  fixed: {
    marginTop: -2
  },
  placeholder: {
    height: 64
  }
})
