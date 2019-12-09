/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 15:00:46
 */
import React from 'react'
import { View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Button, Text } from '@components'
import { IconBack, Avatar, Popover } from '@screens/_'
import { _ } from '@stores'
import { lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'

function Auth(props, { $, navigation }) {
  const styles = memoStyles()
  const { loading, loadingBonus, _loaded } = $.state
  const { nickname, avatar = {} } = $.userInfo
  return (
    <View style={_.container.inner}>
      <Flex>
        <IconBack
          style={{
            marginLeft: -8
          }}
          navigation={navigation}
          color={_.colorTinygrailPlain}
        />
        <Avatar
          size={40}
          src={tinygrailOSS(avatar && avatar.large)}
          borderColor='transparent'
        />
        <Flex.Item style={_.ml.sm}>
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
            size={18}
          >
            {nickname}
          </Text>
          {!!_loaded && (
            <Text
              style={[
                _.mt.xs,
                {
                  color: _.colorTinygrailIcon
                }
              ]}
              size={12}
            >
              上次授权: {lastDate(_loaded)}
            </Text>
          )}
        </Flex.Item>
        <Button
          style={[styles.btn, _.ml.sm]}
          type='warning'
          size='sm'
          loading={loading}
          onPress={$.doAuth}
        >
          授权
        </Button>
        <Popover
          data={['刮刮乐', '每周分红', '每日签到']}
          onSelect={title => {
            setTimeout(() => {
              switch (title) {
                case '刮刮乐':
                  Alert.alert('小圣杯助手', '消费₵1000购买一张刮刮乐彩票?', [
                    {
                      text: '取消'
                    },
                    {
                      text: '确定',
                      onPress: () => $.doLottery(navigation)
                    }
                  ])
                  break
                case '每周分红':
                  Alert.alert(
                    '警告',
                    '领取每周分红后，将不能再领取每日奖励，确定? (每周日0点刷新)',
                    [
                      {
                        text: '取消'
                      },
                      {
                        text: '确定',
                        onPress: $.doGetBonusWeek
                      }
                    ]
                  )
                  break
                case '每日签到':
                  Alert.alert(
                    '警告',
                    '领取每日签到后，将不能再领取每周分红，暂每天₵1500，确定?',
                    [
                      {
                        text: '取消'
                      },
                      {
                        text: '确定',
                        onPress: $.doGetBonusDaily
                      }
                    ]
                  )
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
            更多
          </Button>
        </Popover>
      </Flex>
    </View>
  )
}

Auth.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Auth)

const memoStyles = _.memoStyles(_ => ({
  btn: {
    width: 72,
    backgroundColor: _.colorTinygrailIcon,
    borderColor: _.colorTinygrailIcon
  }
}))
