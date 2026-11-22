/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 16:40:00
 */
import { useEffect, useRef, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { INIT_DISCOVERY_MENU } from '@stores/system/init'
import { stl } from '@utils'
import { withT } from '@utils/fetch'
import { useInsets, useNavigation } from '@utils/hooks'
import { ANDROID, WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { MenuItem } from '@types'
import type { Props } from './types'

const Btns = ({ setMenu, onCancel, onSave }: Props) => {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const { height: windowHeight } = useWindowDimensions()
  const { tabBarHeight } = useInsets()

  const wrapRef = useRef<View>(null)

  /** 容器底边到屏幕底的距离 (bottomOffset = wrap 底边距屏幕底) */
  const [bottomOffset, setBottomOffset] = useState<number>()

  /**
   * 按钮条是 absolute, bottom 相对的是拖拽容器而不是屏幕, 容器底边并不等于屏幕底,
   * 直接写死贴 Tab 栏的高度会在 pad 横屏、小屏或容器不满一屏时偏出可视区域;
   * 这里测出容器底边距屏幕底的距离, 再换算成贴住底部 Tab 栏所需的高度
   */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      wrapRef.current?.measureInWindow((_x, y, _width, height) => {
        setBottomOffset(windowHeight - (y + height))
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [windowHeight])

  return (
    <View
      ref={wrapRef}
      style={stl(
        styles.wrap,
        ANDROID &&
          bottomOffset != null && {
            // 目标: 按钮底边距屏幕底 = Tab 栏高度 + sm, 容器自身有 md 的下边距需要减掉
            bottom: tabBarHeight + _.sm - _.md - bottomOffset
          }
      )}
    >
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
