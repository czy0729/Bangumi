/*
 * @Author: czy0729
 * @Date: 2025-05-02 18:38:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:14
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import SubmitBtn from '../submit-btn'
import { bottomTextType, cover, lv } from '../utils'
import Form from './form'
import Item from './item'
import { styles } from './styles'

function Bottom({
  leftSelected,
  rightSelected,
  amount,
  loading,
  canSubmit,
  isChaos,
  isFishEye,
  isGuidePost,
  isStarBreak,
  isStarDust,
  isTemple,
  hasRight,
  onCancelLeft,
  onCancelRight,
  onFocus,
  onBlur,
  onChangeText,
  onSubmit
}) {
  const memoLeftText = useMemo(() => {
    if (isChaos) return '-10'
    if (isGuidePost || isStarBreak || isFishEye) return '-100'
    if (isStarDust) {
      if (!isTemple && leftSelected && rightSelected) {
        const _lv = lv(leftSelected) - lv(rightSelected)
        if (_lv < 0) return `每 -${Math.min(32, 2 ** -(_lv + 1))}`
      }
      return `-${amount || '?'}`
    }
    return ''
  }, [
    amount,
    isChaos,
    isFishEye,
    isGuidePost,
    isStarBreak,
    isStarDust,
    isTemple,
    leftSelected,
    rightSelected
  ])
  const memoRightText = useMemo(() => {
    if (isChaos) return '+10-100'
    if (isGuidePost) return '+10-100'
    if (isStarDust || isFishEye) return `+${amount || '?'}`
    if (isStarBreak) return '-20-200'
    return ''
  }, [amount, isChaos, isFishEye, isGuidePost, isStarBreak, isStarDust])

  return useObserver(() => {
    return (
      <View>
        <Flex style={styles.bottom}>
          <Flex.Item>
            {leftSelected ? (
              <Item
                src={cover(leftSelected)}
                name={leftSelected.name}
                level={lv(leftSelected)}
                change={memoLeftText}
                type={bottomTextType(memoLeftText)}
                onPress={onCancelLeft}
              />
            ) : (
              <Text type='tinygrailText' size={10}>
                [请选择消耗]
              </Text>
            )}
          </Flex.Item>
          {hasRight && (
            <Flex.Item style={_.ml.sm}>
              {rightSelected ? (
                <Item
                  src={cover(rightSelected)}
                  name={rightSelected.name}
                  level={lv(rightSelected)}
                  change={memoRightText}
                  type={bottomTextType(memoRightText)}
                  onPress={onCancelRight}
                />
              ) : (
                <Text type='tinygrailText' size={10}>
                  [请选择目标]
                </Text>
              )}
            </Flex.Item>
          )}
          {!isStarDust && <SubmitBtn canSubmit={canSubmit} loading={loading} onSubmit={onSubmit} />}
        </Flex>
        {isStarDust && (
          <Flex>
            <Form amount={amount} onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} />
            <SubmitBtn canSubmit={canSubmit} loading={loading} onSubmit={onSubmit} />
          </Flex>
        )}
      </View>
    )
  })
}

export default Bottom
