/*
 * @Author: czy0729
 * @Date: 2023-11-23 13:20:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:23:20
 */
import React from 'react'
import { Flex, SwitchPro, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { alert } from '@utils'
import { s2tAsync } from '@utils/async'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function SwitchItem() {
  const { $ } = useStore<Ctx>()
  const { autoJA } = $.state
  return (
    <Flex style={_.mt.sm}>
      <Flex style={styles.label}>
        <Text size={12}>刮削</Text>
        <IconTouchable
          style={_.ml._xs}
          name='md-info-outline'
          size={14}
          onPress={() => {
            alert(
              s2tAsync(
                `保存后是否对所有文件夹，尽可能离线刮削动画条目信息。
                \n在文件夹结构读取完毕的那一刻就会完成刮削，若你更改了开关，请重新选择文件夹。
                \n仅建议在管理动画时打开此选项。`
              )
            )
          }}
        />
      </Flex>
      <Flex.Item>
        <SwitchPro style={styles.switch} value={autoJA} onSyncPress={$.onSwitchAutoJA} />
      </Flex.Item>
    </Flex>
  )
}

export default ob(SwitchItem)
