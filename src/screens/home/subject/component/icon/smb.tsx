/*
 * @Author: czy0729
 * @Date: 2022-04-07 03:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:10:56
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import styles from './styles'

function IconSMB(_props, { navigation }: Ctx) {
  if (WEB || !systemStore.setting.showSMB) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'SMB',
          from: '本地'
        })

        navigation.push('Smb')
      }}
    >
      <Flex>
        <Text type='sub'>管理</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default obc(IconSMB)
