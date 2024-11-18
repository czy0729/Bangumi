/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:48:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:27:56
 */
import React from 'react'
import { Empty as EmptyComp, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../../types'

function Empty() {
  const { $, navigation } = useStore<Ctx>()
  const { filter } = $.state
  const value = filter.trim()
  return (
    <EmptyComp
      text={
        $.smbs.length
          ? `当前没有文件夹数据\n${
              WEB ? '请确保你选择的文件夹存在文件或者有权限读取' : '请先点击右上方菜单扫描文件夹'
            }`
          : `当前没有服务器数据\n请先点击右上方菜单新增服务`
      }
    >
      {!!value && (
        <Touchable
          style={_.mt.sm}
          onPress={() => {
            navigation.push('Search', {
              value
            })
          }}
        >
          <Text type='sub' align='center'>
            前往搜索{' '}
            <Text type='sub' underline>
              {value.trim()}
            </Text>
          </Text>
        </Touchable>
      )}
    </EmptyComp>
  )
}

export default ob(Empty)
