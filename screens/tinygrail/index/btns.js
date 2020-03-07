/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 16:32:14
 */
import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { SAY_TINYGRAIL_ID } from '@constants'

const dataToday = ['刮刮乐', '每周分红', '每日签到', '节日福利']
const dataMore = ['重新授权', '人物直达', '小组讨论', '意见反馈', '设置']

function Btns(props, { $, navigation }) {
  const styles = memoStyles()
  const { loading, loadingBonus, _loaded } = $.state
  if (!_loaded) {
    return (
      <Button
        style={[styles.btn, _.ml.sm]}
        type='warning'
        size='sm'
        loading={loading}
        onPress={$.doAuth}
      >
        授权
      </Button>
    )
  }

  return (
    <>
      <Popover
        data={dataToday}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '刮刮乐':
                $.doLottery(navigation)
                break
              case '每周分红':
                Alert.alert('警告', '确定领取每周分红? (每周日0点刷新)', [
                  {
                    text: '取消',
                    style: 'cancel'
                  },
                  {
                    text: '确定',
                    onPress: $.doGetBonusWeek
                  }
                ])
                break
              case '每日签到':
                $.doGetBonusDaily()
                break
              case '节日福利':
                $.doGetBonusHoliday()
                break
              default:
                break
            }
          }, 400)
        }}
      >
        <Button
          style={[styles.btn, _.ml.sm]}
          type='warning'
          size='sm'
          loading={loadingBonus}
        >
          每日
        </Button>
      </Popover>
      <Popover
        data={dataMore}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '重新授权':
                $.doAuth()
                break
              case '人物直达':
                navigation.push('TinygrailSearch')
                break
              case '小组讨论':
                navigation.push('Group', {
                  groupId: 'tinygrail'
                })
                break
              case '意见反馈':
                navigation.push('Say', {
                  id: SAY_TINYGRAIL_ID
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
        <Button
          style={[styles.btn, _.ml.sm]}
          type='warning'
          size='sm'
          loading={loading}
        >
          更多
        </Button>
      </Popover>
    </>
  )
}

Btns.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Btns)

const memoStyles = _.memoStyles(_ => ({
  btn: {
    width: 72,
    backgroundColor: _.colorTinygrailIcon,
    borderColor: _.colorTinygrailIcon
  }
}))
