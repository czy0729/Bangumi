/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 22:39:30
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont, Touchable } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import { APP_ID_SAY_TINYGRAIL } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Btns(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const price = 2000 * 2 ** ($.state.count || 0)
  return (
    <>
      {$.state._loaded ? (
        <Popover
          style={styles.touch}
          data={[
            '刮刮乐',
            `幻想乡刮刮乐(${price})`,
            '每周分红',
            '每日签到',
            // '节日福利',
            '重新授权',
            '粘贴板',
            // '意见反馈',
            '设置'
          ]}
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

                case '重新授权':
                  $.doAuth()
                  break

                case '粘贴板':
                  navigation.push('TinygrailClipboard')
                  break

                case '意见反馈':
                  navigation.push('Say', {
                    sayId: APP_ID_SAY_TINYGRAIL
                  })
                  break

                case '设置':
                  navigation.push('Setting')
                  break

                default:
                  $.doLottery(navigation, true)
                  break
              }
            }, 400)
          }}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont name='md-menu' color={_.colorTinygrailPlain} />
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
            <Iconfont name='md-menu-open' color={_.colorTinygrailPlain} />
          </Flex>
        </Touchable>
      </View>
    </>
  )
}

export default obc(Btns, COMPONENT)
