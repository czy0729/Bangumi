/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-20 21:16:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { feedback, stl } from '@utils'
import { StatusBtnGroup } from '../../status-btn-group'
import { styles } from './styles'

import type { Props } from './types'

function Status({ status, action, onSelect }: Props) {
  const { autoCompleteEps } = systemStore.setting

  return (
    <>
      <StatusBtnGroup style={_.mt.md} value={status} action={action} onSelect={onSelect} />
      {action === '看' && status === 'collect' && (
        <View style={stl(styles.setting, !autoCompleteEps && styles.opacity)}>
          <Touchable
            withoutFeedback
            onPress={() => {
              systemStore.switchSetting('autoCompleteEps')
              feedback(true)
            }}
          >
            <Flex>
              <Text type='sub' size={12} bold>
                看过时自动完成所有进度
              </Text>
              <Iconfont
                style={_.ml.xs}
                name={autoCompleteEps ? 'md-radio-button-on' : 'md-radio-button-off'}
                color={_.colorSub}
                size={14}
              />
            </Flex>
          </Touchable>
        </View>
      )}
    </>
  )
}

export default observer(Status)
