/*
 * @Author: czy0729
 * @Date: 2025-04-15 18:20:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 19:33:25
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { HOUR_DS, MINUTE_DS, WEEK_DAY_DS, WEEK_DAY_MAP } from '../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function OnairCustom() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { weekDay, h, m, isCustom } = $.onAirCustom

    const handleSelectWeekDay = useCallback((title: string) => {
      const map = {}
      Object.keys(WEEK_DAY_MAP).forEach(item => (map[WEEK_DAY_MAP[item]] = item))
      $.onSelectOnAir(Number(map[title] || 0), `${$.onAirCustom.h}${$.onAirCustom.m}`)
    }, [])
    const handleSelectHour = useCallback((title: string) => {
      $.onSelectOnAir($.onAirCustom.weekDay, `${title || '00'}${$.onAirCustom.m || '00'}`)
    }, [])
    const handleSelectMinute = useCallback((title: string) => {
      $.onSelectOnAir($.onAirCustom.weekDay, `${$.onAirCustom.h || '00'}${title || '00'}`)
    }, [])

    return (
      <Flex>
        <Popover data={WEEK_DAY_DS} onSelect={handleSelectWeekDay}>
          <Flex style={styles.onair} justify='center'>
            <Text type='sub' size={11} bold>
              {WEEK_DAY_MAP[weekDay] === undefined ? '周' : WEEK_DAY_MAP[weekDay]}
            </Text>
          </Flex>
        </Popover>
        <Popover style={_.ml.sm} data={HOUR_DS} onSelect={handleSelectHour}>
          <Flex style={styles.onair} justify='center'>
            <Text type='sub' size={11} bold>
              {h || '时'}
            </Text>
          </Flex>
        </Popover>
        <Popover style={_.ml.sm} data={MINUTE_DS} onSelect={handleSelectMinute}>
          <Flex style={styles.onair} justify='center'>
            <Text type='sub' size={11} bold>
              {m || '分'}
            </Text>
          </Flex>
        </Popover>
        {isCustom && (
          <View style={styles.reset}>
            <IconTouchable
              style={_.mr._xs}
              name='md-refresh'
              size={20}
              onPress={$.resetOnAirUser}
            />
          </View>
        )}
      </Flex>
    )
  })
}

export default OnairCustom
