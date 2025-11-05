/*
 * @Author: czy0729
 * @Date: 2022-04-07 03:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:58:51
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import styles from './styles'

function IconSMB() {
  const navigation = useNavigation()
  if (WEB || !systemStore.setting.showSMB) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Smb')

        t('条目.跳转', {
          to: 'SMB',
          from: '本地'
        })
      }}
    >
      <Flex>
        <Text type='sub'>管理</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default ob(IconSMB)
