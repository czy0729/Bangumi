/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 09:00:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { INIT_DISCOVERY_MENU } from '@stores/system/init'
import { withT } from '@utils/fetch'
import { useInsets, useNavigation } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { MenuItem } from '@types'
import type { Props } from './types'

const Btns = ({ setMenu, onCancel, onSave }: Props) => {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  /**
   * 安卓屏幕内容会延伸到不透明的底部 Tab 栏下面, 按钮吸容器底会落在 Tab 栏区域内被遮挡
   * (pad 上大概只露出一半, 3 键导航甚至完全被盖住), 需要用含底部安全区的实际 Tab 栏高度上移;
   * iOS 的定位已是 Tab 栏上方, 保持不变
   */
  const { tabBarHeight } = useInsets()

  return (
    <View style={[styles.wrap, !WEB && !IOS && { bottom: tabBarHeight + _.md }]}>
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
            setMenu(INIT_DISCOVERY_MENU as MenuItem['key'][])
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
