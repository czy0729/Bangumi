/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, SafeAreaBottom, Text, Touchable } from '@components'
import { _ } from '@stores'
import Item from '../item'
import { memoStyles } from './styles'

import type { Props } from './types'

/** treemap 网格: 尺寸由容器布局测量后交给上层排布 */
function Treemap({
  data,
  measured,
  isDark,
  myData,
  onLayout,
  onPress,
  onLongPress,
  onReset
}: Props) {
  const styles = memoStyles()

  return (
    <SafeAreaBottom style={styles.wrap} type='paddingBottom'>
      <View style={styles.container} onLayout={onLayout}>
        {measured &&
          data.map(item => (
            <Item
              key={item.data}
              {...item}
              isDark={isDark}
              isMine={item.data === myData}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          ))}
        {measured && !data.length && (
          <Flex style={styles.empty} direction='column' justify='center'>
            <Text size={12} type='sub'>
              已隐藏全部支持者
            </Text>
            <Touchable style={_.mt.sm} onPress={onReset}>
              <Text size={12} type='main' bold>
                点击重置
              </Text>
            </Touchable>
          </Flex>
        )}
      </View>
    </SafeAreaBottom>
  )
}

export default observer(Treemap)
