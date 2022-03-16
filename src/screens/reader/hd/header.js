/*
 * @Author: czy0729
 * @Date: 2022-03-16 18:17:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:19:18
 */
import React from 'react'
import { Alert } from 'react-native'
import { Header as CompHeader } from '@components'
import { IconHeader } from '@_'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'

function Header(props, { $ }) {
  return (
    <CompHeader
      title={$.params?.cn || 'HD'}
      alias='HD'
      hm={['hd', 'HD']}
      headerRight={() => (
        <IconHeader
          name='md-info-outline'
          onPress={() => {
            t('HD.提示')

            Alert.alert(
              '高清高速源头',
              '一般只提供高清单行本数据\n会不定时添加数据\n所有数据来源于互联网请支持正版\n若因不可抗力原因功能会随时下线\n若想收录想要的单行本可留言私聊',
              [
                {
                  text: '知道了'
                }
              ]
            )
          }}
        />
      )}
    />
  )
}

export default obc(Header)
