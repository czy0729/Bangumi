/*
 * @Author: czy0729
 * @Date: 2021-08-20 14:44:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 16:56:14
 */
import React from 'react'
import { Alert } from 'react-native'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'

function IconHidden({ name, value }, { $ }) {
  if (!name || !value) return null

  return (
    <IconTouchable
      style={[
        _.mr._sm,
        {
          paddingVertical: 0
        }
      ]}
      name='md-close'
      color={_.colorIcon}
      onPress={() => {
        Alert.alert('警告', `确定永久隐藏栏目[${name}]?\n隐藏后可到右上角菜单里重置`, [
          {
            text: '取消',
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              $.hiddenBlock(value)
              info('已隐藏')
            }
          }
        ])
      }}
    >
      <Heatmap id='条目.删除收藏' />
    </IconTouchable>
  )
}

export default obc(IconHidden)
