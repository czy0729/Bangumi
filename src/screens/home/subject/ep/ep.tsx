/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 14:17:06
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex, Input, Button, Heatmap } from '@components'
import { SectionTitle, Popover, IconTouchable } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
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
    isDoing,
    showEpInput,
    showCustomOnair,
    onChangeText,
    onSelectOnAir,
    onResetOnAirUser,
    onScrollIntoViewIfNeeded,
    doUpdateSubjectEp
  }) => {
    global.rerender('Subject.Ep.Main')

    const { weekDay, h, m, isExist, isCustom } = onAirCustom
    const showOnair = showCustomOnair && (isExist || isDoing)
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              <IconEpFilter />
              <IconOnline />
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
        {(showEpInput || showOnair) && (
          <Flex style={_.mt.sm}>
            <Flex.Item>
              {showEpInput && (
                <Flex>
                  <View style={styles.input}>
                    <Input
                      style={styles.inputRaw}
                      pointerEvents='box-none'
                      keyboardType='numeric'
                      value={watchedEps}
                      placeholder={watchedEps || '0'}
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
                  <Button
                    style={styles.btn}
                    size='sm'
                    type='ghostPrimary'
                    onPress={doUpdateSubjectEp}
                  >
                    更新
                  </Button>
                </Flex>
              )}
            </Flex.Item>
            {showOnair && (
              <Flex>
                <Popover
                  data={WEEK_DAY_DS}
                  onSelect={title => {
                    const map = {}
                    Object.keys(WEEK_DAY_MAP).forEach(
                      item => (map[WEEK_DAY_MAP[item]] = item)
                    )
                    onSelectOnAir('weekDayCN', Number(map[title] || 0))
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
                  data={HOUR_DS}
                  onSelect={title =>
                    onSelectOnAir('timeCN', `${title || '00'}${m || '00'}`)
                  }
                >
                  <Flex style={styles.btnOnAir} justify='center'>
                    <Text size={11} bold type='sub'>
                      {h || '时'}
                    </Text>
                  </Flex>
                </Popover>
                <Popover
                  data={MINUTE_DS}
                  onSelect={title =>
                    onSelectOnAir('timeCN', `${h || '00'}${title || '00'}`)
                  }
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
