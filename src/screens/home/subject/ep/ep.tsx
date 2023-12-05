/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 17:40:55
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex, Input, Button, Heatmap } from '@components'
import { SectionTitle, Popover, IconTouchable } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { SHARE_MODE } from '@constants'
import Eps from '../eps'
import IconEpFilter from '../icon/ep-filter'
import IconOnline from '../icon/online'
import IconEp from '../icon/ep'
import IconReverse from '../icon/reverse'
import { DEFAULT_PROPS, WEEK_DAY_DS, WEEK_DAY_MAP, HOUR_DS, MINUTE_DS } from './ds'

export default memo(
  ({
    styles,
    watchedEps,
    totalEps,
    onAirCustom,
    status,
    isDoing,
    showEpInput,
    showCustomOnair,
    focusOrigin,
    onChangeText,
    onSelectOnAir,
    onResetOnAirUser,
    onScrollIntoViewIfNeeded,
    doUpdateSubjectEp
  }) => {
    rerender('Subject.Ep.Main')

    const _showEpInput = showEpInput && !SHARE_MODE
    const canSubmit = !!status.name && status.name !== '未收藏'

    const { weekDay, h, m, isOnair, isCustom } = onAirCustom
    const showOnair = showCustomOnair && (isOnair || isDoing)
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              <IconEpFilter />
              {!focusOrigin && <IconOnline />}
              <IconEp />
              <IconReverse />
            </>
          }
        >
          章节
        </SectionTitle>
        <View style={_.mt.md}>
          <Eps />
          <Heatmap id='条目.章节按钮长按' />
          <Heatmap bottom={35} id='条目.章节菜单操作' />
        </View>
        {(_showEpInput || showOnair) && (
          <Flex style={_.mt.sm}>
            <Flex.Item>
              {_showEpInput && (
                <Flex>
                  <View style={styles.input}>
                    <Input
                      style={styles.inputRaw}
                      pointerEvents='box-none'
                      keyboardType='numeric'
                      value={watchedEps}
                      placeholder={watchedEps || '0'}
                      editable={canSubmit}
                      clearButtonMode='never'
                      returnKeyType='done'
                      returnKeyLabel='更新'
                      onChangeText={text =>
                        onChangeText('watchedEps', text.replace(/[^\d]+/, ''))
                      }
                      onSubmitEditing={doUpdateSubjectEp}
                      onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                    />
                    {!!totalEps && (
                      <Text style={styles.total} type='sub' size={11} bold>
                        / {totalEps}
                      </Text>
                    )}
                  </View>
                  <View style={_.ml.sm}>
                    <Button
                      style={styles.btn}
                      size='sm'
                      type='ghostPrimary'
                      onPress={canSubmit ? doUpdateSubjectEp : undefined}
                    >
                      更新
                    </Button>
                  </View>
                </Flex>
              )}
            </Flex.Item>
            {showOnair && (
              <Flex key={`${weekDay}${h}${m}`}>
                <Popover
                  data={WEEK_DAY_DS}
                  onSelect={title => {
                    const map = {}
                    Object.keys(WEEK_DAY_MAP).forEach(
                      item => (map[WEEK_DAY_MAP[item]] = item)
                    )
                    onSelectOnAir(Number(map[title] || 0), `${h}${m}`)
                  }}
                >
                  <Flex style={styles.btnOnAir} justify='center'>
                    <Text size={11} bold type='sub'>
                      {WEEK_DAY_MAP[weekDay] === undefined
                        ? '周'
                        : WEEK_DAY_MAP[weekDay]}
                    </Text>
                  </Flex>
                </Popover>
                <Popover
                  style={_.ml.sm}
                  data={HOUR_DS}
                  onSelect={title => {
                    onSelectOnAir(weekDay, `${title || '00'}${m || '00'}`)
                  }}
                >
                  <Flex style={styles.btnOnAir} justify='center'>
                    <Text size={11} bold type='sub'>
                      {h || '时'}
                    </Text>
                  </Flex>
                </Popover>
                <Popover
                  style={_.ml.sm}
                  data={MINUTE_DS}
                  onSelect={title => {
                    onSelectOnAir(weekDay, `${h || '00'}${title || '00'}`)
                  }}
                >
                  <Flex style={styles.btnOnAir} justify='center'>
                    <Text size={11} bold type='sub'>
                      {m || '分'}
                    </Text>
                  </Flex>
                </Popover>
                {isCustom && (
                  <View style={styles.btnReset}>
                    <IconTouchable
                      style={_.mr._xs}
                      name='md-refresh'
                      size={20}
                      onPress={onResetOnAirUser}
                    />
                  </View>
                )}
              </Flex>
            )}
            <Heatmap id='条目.输入框更新章节' />
          </Flex>
        )}
      </View>
    )
  },
  DEFAULT_PROPS
)
