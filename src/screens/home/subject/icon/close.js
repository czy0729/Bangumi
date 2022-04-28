/*
 * @Author: czy0729
 * @Date: 2021-01-16 19:14:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:16:48
 */
import React from 'react'
import { Alert } from 'react-native'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import i18n from '@constants/i18n'

function IconClose(props, { $ }) {
  const { status = { name: '未收藏' } } = $.collection
  const { formhash } = $.subjectFormHTML
  const showErase = status.name !== '未收藏' && !!formhash
  return (
    <IconTouchable
      style={_.mr._sm}
      name='md-close'
      color={_.colorIcon}
      onPress={() => {
        if (!showErase) {
          info(`无法操作, 请检查${i18n.login()}状态`)
          return
        }

        Alert.alert('警告', '确定删除收藏?', [
          {
            text: '取消',
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => $.doEraseCollection()
          }
        ])
      }}
    >
      <Heatmap id='条目.删除收藏' />
    </IconTouchable>
  )
}

export default obc(IconClose)
