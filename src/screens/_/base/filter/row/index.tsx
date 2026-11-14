/*
 * @Author: czy0729
 * @Date: 2026-11-12 22:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 单个筛选组
 */
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { info, isArray, stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import i18n from '@constants/i18n'
import { HIT_SLOP } from '../ds'
import { memoStyles } from '../styles'
import Option from '../option'
import { scrollToX } from '../utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'
import type { OptionValue, Props } from './types'

function Row({ item, counts, eventId }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)
  const styles = memoStyles()
  const query = ($?.state?.query || {}) as Record<string, unknown>
  const state: unknown = query[item.type]
  const { multiple, multiSelect } = item
  const groups = item.data as unknown as OptionValue[][]
  const options = item.data as unknown as OptionValue[]
  const isEmpty = isArray(state) ? state.length === 0 : state === ''
  const isActive = (value: OptionValue) =>
    isArray(state) ? state.includes(value) : state === value

  /**
   * 条件计数优先, 数据未就绪回落构建期静态分布
   *  - counts 就绪时该维缺键视为 0 (防御候选与 facet 失配), 维度整体缺席 (sort/collected) 才回落
   */
  const getNum = (value: OptionValue) => {
    const nums = counts?.[item.type]
    if (nums) {
      const num = nums[String(value)]
      return num !== undefined ? num : 0
    }
    return item.nums?.[String(value)]
  }

  const handleSelect = (value: OptionValue, multi?: boolean) => {
    if (typeof $?.onSelect === 'function') $.onSelect(item.type, value, multi)
  }

  return (
    <Flex style={styles.row} align={multiple ? 'start' : 'center'}>
      <View>
        <View>
          <Text style={multiple && styles.multipleTitle} size={12} bold noWrap>
            {item.title}
          </Text>
          {multiSelect && (
            <Touchable style={styles.how} useRN onPress={() => info('长按标签多选类型')}>
              <Text type={_.select('sub', 'icon')} size={12} lineHeight={12} bold noWrap>
                多选
              </Text>
            </Touchable>
          )}
        </View>
        <Heatmap right={-16} bottom={8} id={eventId} type={item.type} mini />
      </View>
      <Flex.Item style={_.ml.md}>
        <Flex align={multiple ? 'start' : 'center'}>
          <Touchable
            style={stl(
              styles.item,
              isEmpty && styles.itemActive,
              multiple && {
                marginTop: _.r(4)
              }
            )}
            hitSlop={HIT_SLOP}
            onPress={() => handleSelect('')}
          >
            <Text size={11} noWrap>
              {item.type === 'sort' ? '默认' : '全部'}
            </Text>
          </Touchable>
          <ScrollView
            ref={scrollView => {
              scrollToX(
                scrollView,
                item.data,
                state,
                ['制作', '开发商', '发行商'].includes(item.title) ? 80 : 50,
                item.multiple
              )
            }}
            style={styles.contentContainerStyle}
            horizontal
            {...SCROLL_VIEW_RESET_PROPS}
          >
            {multiple ? (
              <Flex style={styles.multiple} direction='column' align='start'>
                {groups.map((group, idx) => (
                  <Flex key={idx} style={styles.contentContainerStyle}>
                    {group.map(value => (
                      <Option
                        key={value}
                        label={String(value)}
                        num={getNum(value)}
                        active={isActive(value)}
                        disabled={!isActive(value) && getNum(value) === 0}
                        multiSelect={multiSelect}
                        eventId={eventId}
                        onPress={() => handleSelect(value)}
                        onLongPress={multiSelect ? () => handleSelect(value, true) : undefined}
                      />
                    ))}
                  </Flex>
                ))}
              </Flex>
            ) : (
              <>
                {item.login && !$?.isLogin ? (
                  <Text style={_.ml.sm} size={11} type='sub' lineHeight={16}>
                    {i18n.login()}后显示
                  </Text>
                ) : (
                  options.map(value => (
                    <Option
                      key={value}
                      label={String(value)}
                      num={getNum(value)}
                      active={isActive(value)}
                      disabled={!isActive(value) && getNum(value) === 0}
                      eventId={eventId}
                      onPress={() => handleSelect(value)}
                    />
                  ))
                )}
              </>
            )}
          </ScrollView>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Row)
