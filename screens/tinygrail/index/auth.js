/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-09 14:35:02
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { IconBack, Avatar } from '@screens/_'
import { _ } from '@stores'
import { lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'
import Btns from './btns'

function Auth(props, { $, navigation }) {
  const { _loaded } = $.state
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
          name={nickname}
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
          {$.advance ? (
            <Text style={_.mt.xs} type='warning' size={12}>
              高级会员
            </Text>
          ) : (
            !!_loaded && (
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
            )
          )}
        </Flex.Item>
        <Btns />
      </Flex>
    </View>
  )
}

Auth.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Auth)
