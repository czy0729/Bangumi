/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:03:00
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont, Touchable } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { APP_ID_SAY_TINYGRAIL } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Btns() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const price = 2000 * 2 ** ($.state.count || 0)
    const data = useMemo(
      () => [
        '刮刮乐',
        `幻想乡刮刮乐(${price})`,
        '每周分红',
        '每日签到',
        '节日福利',
        '重新授权',
        '粘贴板',
        '小组讨论',
        '设置'
      ],
      [price]
    )
    const handleSelect = useCallback((title: string) => {
      setTimeout(() => {
        switch (title) {
          case '刮刮乐':
            $.doLottery()
            break

          case '每周分红':
            confirm('确定领取每周分红? (每周日0点刷新)', $.doGetBonusWeek)
            break

          case '每日签到':
            $.doGetBonusDaily()
            break

          case '节日福利':
            $.doGetBonusHoliday()
            break

          case '重新授权':
            $.doAuth()
            break

          case '粘贴板':
            navigation.push('TinygrailClipboard')
            break

          case '人物搜索':
            navigation.push('TinygrailSearch')
            break

          case '小组讨论':
            navigation.push('Group', {
              groupId: 'tinygrail'
            })
            break

          case '意见反馈':
            navigation.push('Say', {
              sayId: APP_ID_SAY_TINYGRAIL
            })
            break

          case '设置':
            navigation.push('Setting', {
              open: 'Tinygrail'
            })
            break

          default:
            $.doLottery(true)
            break
        }
      }, 400)
    }, [])
    return (
      <>
        {$.state._loaded ? (
          <Popover style={styles.touch} data={data} onSelect={handleSelect}>
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
