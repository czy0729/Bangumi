/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-29 14:28:01
 */
import React from 'react'
import { Popover, IconTabsHeader } from '@screens/_'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants/html'

const data = ['本地帖子', '设置', '新讨论', '社区指导原则']

function More({ style, navigation }) {
  return (
    <Popover
      style={style}
      data={data}
      onSelect={key => {
        t('超展开.右上角菜单', {
          key
        })

        switch (key) {
          case '本地帖子':
            navigation.push('RakuenHistory')
            break
          case '设置':
            navigation.push('RakuenSetting')
            break
          case '新讨论':
            open(HTML_NEW_TOPIC())
            break
          case '社区指导原则':
            navigation.push('UGCAgree')
            break
          default:
            break
        }
      }}
    >
      <IconTabsHeader name='more' position='right' />
    </Popover>
  )
}

export default observer(More)
