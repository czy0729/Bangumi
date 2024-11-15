/*
 * @Author: czy0729
 * @Date: 2022-05-30 09:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:33:23
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function FixedToolBar({ fixed, page, pageCurrent, pageTotal, onRefreshOffset }: Props) {
  const { $ } = useStore<Ctx>()

  // 显示容器外固定工具条
  if (fixed) {
    if ($.state.fixed) {
      return (
        <View style={styles.fixed}>
          <ToolBar
            page={$.state.page}
            pageCurrent={pageCurrent}
            pageTotal={pageTotal}
            onRefreshOffset={$.onRefreshOffset}
          />
        </View>
      )
    }

    return null
  }

  // 固定的时候, 容器内工具条不渲染, 显示占位
  if ($.state.fixed) return <View style={styles.placeholder} />

  // 非固定的时候, 容器内工具条
  return (
    <ToolBar
      page={page}
      pageCurrent={pageCurrent}
      pageTotal={pageTotal}
      onRefreshOffset={onRefreshOffset}
    />
  )
}

export default ob(FixedToolBar, COMPONENT)
