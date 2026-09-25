/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { LEVEL_LABELS, LEVELS } from '../../../ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 图表顶部筛选条: 按支持额档次筛选、定位到自己、重置已隐藏的格子 */
function FilterBar({
  filterLength,
  hiddenCount,
  myIndex,
  onBatchFilter,
  onLocate,
  onReset
}: Props) {
  const styles = memoStyles()

  return (
    <Flex style={styles.filter} direction='column' justify='center'>
      {filterLength ? (
        <Flex justify='center'>
          <Text size={12} bold>
            已隐藏 {filterLength} 格
          </Text>
          <View style={styles.refresh}>
            <IconTouchable name='md-refresh' color={_.colorDesc} size={18} onPress={onReset} />
          </View>
        </Flex>
      ) : (
        <Text size={11} type='sub' align='center'>
          还有 {hiddenCount} 格未显示，点击方格隐藏 1 格，点击色块只看该档次
        </Text>
      )}
      <Flex style={styles.block} align='center'>
        <Flex.Item>
          <Flex justify='around'>
            {LEVELS.map((item, index) => (
              <Touchable
                key={item.level}
                style={styles.touch}
                onPress={() => onBatchFilter(index)}
                accessibilityRole='button'
                accessibilityLabel={`只显示 ${LEVEL_LABELS[index]}`}
              >
                <Flex>
                  <View style={[styles.l, styles[item.level]]} />
                  <Text style={_.mr.xs} size={11} bold>
                    {LEVEL_LABELS[index]}
                  </Text>
                </Flex>
              </Touchable>
            ))}
          </Flex>
        </Flex.Item>
        {myIndex >= 0 && (
          <IconTouchable
            name='md-radio-button-on'
            color={_.colorDesc}
            size={16}
            onPress={onLocate}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default observer(FilterBar)
