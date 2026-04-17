/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:22:19
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { INIT_DISCOVERY_MENU } from '@stores/system/init'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

const Btns = ({ setMenu, onCancel, onSave }: Props) => {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.wrap}>
      <Flex style={styles.btns} justify='end'>
        <Flex.Item>
          <Touchable style={styles.touch} onPress={onCancel}>
            <Flex style={styles.btn} justify='center'>
              <Text type='icon' size={11} bold>
                取消
              </Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          <Touchable style={styles.touch} onPress={onSave}>
            <Flex style={styles.btn} justify='center'>
              <Text type='__plain__' size={11} bold>
                保存
              </Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <IconTouchable
          style={_.device(_.ml.md, _.ml.lg)}
          name='md-refresh'
          color={_.colorDesc}
          onPress={() => {
            setMenu(INIT_DISCOVERY_MENU)
          }}
        />
        {!WEB && (
          <IconTouchable
            style={_.ml.md}
            name='icon-setting'
            size={19}
            color={_.colorDesc}
            onPress={withT(
              () => {
                navigation.push('Setting', {
                  open: 'Discovery'
                })

                setTimeout(() => {
                  onCancel()
                }, 400)
              },
              '发现.跳转',
              {
                to: 'Setting',
                from: 'SortMenu'
              }
            )}
          />
        )}
      </Flex>
    </View>
  )
}

export default observer(Btns)
