/*
 * @Author: czy0729
 * @Date: 2022-03-30 20:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 19:50:00
 */
import { Animated, View } from 'react-native'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { syncSystemStore } from '@utils/async'
import { DEV as dev, IOS } from '@constants'
import { Flex, flexStyle } from '../flex'
import { Iconfont } from '../iconfont'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { useDevButtonDrag } from './hooks'
import { devLog, devLogLimit, devLogs, logs, showSystemDevMenu } from './utils'
import { styles } from './styles'

export { devLog, devLogs, devLogLimit }

/** dev 浮层入口 (hooks 隔离在内层, 避免运行时切换 dev 开关导致 hook 数量变化) */
export const DEV = observer(() => {
  if (!dev && !syncSystemStore().state.dev) return null

  return <DevFloat />
})

/** 开发者按钮与日志浮层 */
const DevFloat = observer(() => {
  const { pan, panHandlers } = useDevButtonDrag()

  return (
    <>
      {!!logs.length && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          {logs.map((item, index) => (
            <Flex key={`${index}|${item.date}`} style={_.mb.sm} align='start'>
              <Text type='sub' size={12} lineHeight={14}>
                {item.date.slice(3, 8)}
              </Text>
              <Flex.Item style={_.ml.sm}>
                <Text type='__plain__' size={12} lineHeight={14} selectable>
                  {item.data}
                </Text>
              </Flex.Item>
            </Flex>
          ))}
        </ScrollView>
      )}
      {!IOS && (
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 1000,
            left: pan.x,
            top: pan.y
          }}
          {...panHandlers}
        >
          <Touchable
            style={stl(flexStyle({ justify: 'center' }), styles.touch, styles.icon)}
            onPress={showSystemDevMenu}
          >
            <Iconfont name='icon-setting' color='#fff' size={20} />
          </Touchable>
        </Animated.View>
      )}
      {!!logs.length && (
        <View style={styles.clear}>
          <Touchable
            style={stl(flexStyle({ justify: 'center' }), styles.clearTouch, styles.icon)}
            onPress={() => {
              runInAction(() => {
                logs.clear()
              })
            }}
          >
            <Iconfont name='md-close' color={_.__colorPlain__} size={20} />
          </Touchable>
        </View>
      )}
    </>
  )
})

export default DEV
