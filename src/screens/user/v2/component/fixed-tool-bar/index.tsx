/*
 * @Author: czy0729
 * @Date: 2022-05-30 09:51:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:29:13
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function FixedToolBar({ fixed, page, pageCurrent, pageTotal, onRefreshOffset }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default FixedToolBar
