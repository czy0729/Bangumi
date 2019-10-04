/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-26 16:06:14
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Button, Text } from '@components'
import { IconBack, Avatar } from '@screens/_'
import { lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorIcon } from '../styles'

function Auth(props, { $, navigation }) {
  const { loading, _loaded } = $.state
  const { nickname, avatar = {} } = $.userInfo
  return (
    <View style={_.container.inner}>
      <Flex>
        <IconBack
          style={{
            marginLeft: -8
          }}
          navigation={navigation}
          color={_.colorPlain}
        />
        <Avatar
          size={40}
          src={tinygrailOSS(avatar && avatar.large)}
          borderColor='transparent'
        />
        <Flex.Item style={_.ml.sm}>
          <Text size={18} type='plain'>
            {nickname}
          </Text>
          {!!_loaded && (
            <Text
              style={[
                _.mt.xs,
                {
                  color: colorIcon
                }
              ]}
              size={12}
            >
              上次授权: {lastDate(_loaded)}
            </Text>
          )}
        </Flex.Item>
        <Button
          style={styles.btn}
          type='warning'
          size='sm'
          loading={loading}
          onPress={$.doAuth}
        >
          {loading ? '授权中' : '授权'}
        </Button>
        {/* <Button
          style={[styles.btn, _.ml.sm]}
          type='warning'
          size='sm'
          loading={loading}
          onPress={$.doAuth}
        >
          签到
        </Button> */}
      </Flex>
    </View>
  )
}

Auth.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Auth)

const styles = StyleSheet.create({
  btn: {
    width: 80,
    backgroundColor: colorIcon,
    borderColor: colorIcon
  }
})
