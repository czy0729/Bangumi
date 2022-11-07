/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 14:05:28
 */
import React from 'react'
import { Button } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import { APP_ID_SAY_TINYGRAIL } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const DATA_MORE = ['重新授权', '粘贴板', '意见反馈', '设置'] as const

function Btns(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { loading, count = 0, _loaded } = $.state
  if (!_loaded) {
    return (
      <Button
        style={styles.btn}
        styleText={styles.text}
        size='sm'
        loading={loading}
        onPress={$.doAuth}
      >
        授权
      </Button>
    )
  }

  const price = 2000 * 2 ** count
  return (
    <>
      <Popover
        style={styles.touch}
        data={['刮刮乐', `幻想乡刮刮乐(${price})`, '每周分红', '每日签到', '节日福利']}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '刮刮乐':
                $.doLottery(navigation)
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

              default:
                $.doLottery(navigation, true)
                break
            }
          }, 400)
        }}
      >
        <Button
          style={styles.btn}
          styleText={styles.text}
          size='sm'
          // loading={loadingBonus}
        >
          每日
        </Button>
      </Popover>
      <Popover
        style={[styles.touch, _.ml.sm]}
        data={DATA_MORE}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '重新授权':
                $.doAuth()
                break

              case '粘贴板':
                navigation.push('TinygrailClipboard')
                break

              case '意见反馈':
                navigation.push('Say', {
                  id: APP_ID_SAY_TINYGRAIL
                })
                break

              case '设置':
                navigation.push('Setting')
                break

              default:
                break
            }
          }, 400)
        }}
      >
        <Button style={styles.btn} styleText={styles.text} size='sm'>
          更多
        </Button>
      </Popover>
    </>
  )
}

export default obc(Btns)
