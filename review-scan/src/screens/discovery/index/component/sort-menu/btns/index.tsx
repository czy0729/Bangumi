/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 19:44:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { INIT_DISCOVERY_MENU } from '@stores/system/init'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const Btns = ({ setMenu, onCancel, onSave }) => {
  const navigation = useNavigation()
  const styles = memoStyles()
  return (
    <View style={WEB ? styles.web : styles.wrap}>
      <Flex style={styles.btns} justify='end'>
        <Flex.Item>
          <Touchable style={styles.touch} onPress={onCancel}>
            <Flex style={styles.btn} justify='center'>
              <Text type='sub' bold size={11}>
                取消
              </Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          <Touchable style={styles.touch} onPress={onSave}>
            <Flex style={styles.btn} justify='center'>
              <Text type='__plain__' bold size={11}>
                保存
              </Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <IconTouchable
          style={_.ml.md}
          name='md-refresh'
          color={_.colorDesc}
          onPress={() => {
            confirm('是否恢复默认菜单布局', () => {
              setMenu(INIT_DISCOVERY_MENU)
            })
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

export default ob(Btns, COMPONENT)
