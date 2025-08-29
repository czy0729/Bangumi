/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 08:04:52
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont, Touchable } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Btns() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const price = 2000 * 2 ** ($.state.count || 0)
    const memoMenu = useMemo(
      () => [
        { title: '刮刮乐', action: () => $.doLottery() },
        { title: `幻想乡刮刮乐(${price})`, action: () => $.doLottery(true) },
        {
          title: '每周分红',
          action: () => confirm('确定领取每周分红? (每周日0点刷新)', $.doGetBonusWeek)
        },
        { title: '每日签到', action: () => $.doGetBonusDaily() },
        { title: '节日福利', action: () => $.doGetBonusHoliday() },
        { title: '重新授权', action: () => $.doAuth() }
      ],
      [price]
    )
    const memoData = useMemo(() => memoMenu.map(item => item.title), [memoMenu])

    const handleSelect = useCallback(
      (title: string) => {
        setTimeout(() => {
          const found = memoMenu.find(item => item.title === title)
          found?.action()
        }, 400)
      },
      [memoMenu]
    )

    return (
      <>
        {$.state._loaded ? (
          <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
            <Flex style={styles.btn} justify='center'>
              <Iconfont name='md-menu' color={_.colorTinygrailPlain} size={20} />
            </Flex>
          </Popover>
        ) : (
          <Button
            style={styles.btn}
            styleText={styles.text}
            size='sm'
            loading={$.state.loading}
            onPress={$.doAuth}
          >
            授权
          </Button>
        )}
        <View style={styles.touch}>
          <Touchable onPress={$.onToggleLogs}>
            <Flex style={styles.btn} justify='center'>
              <Iconfont name='md-menu-open' color={_.colorTinygrailPlain} size={20} />
            </Flex>
          </Touchable>
        </View>
      </>
    )
  })
}

export default Btns
