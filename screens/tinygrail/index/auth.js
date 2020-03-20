/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 01:08:41
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { IconBack, IconTouchable, Avatar } from '@screens/_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils/app'
import { observer } from '@utils/decorators'
import Btns from './btns'

function Auth(props, { $, navigation }) {
  const styles = memoStyles()
  const { _loaded } = $.state
  const { nickname, avatar = {} } = $.userInfo
  return (
    <View style={styles.container}>
      <Flex>
        <IconBack
          style={styles.back}
          navigation={navigation}
          color={_.colorTinygrailPlain}
        />
        <Avatar
          style={styles.avatar}
          size={32}
          src={tinygrailOSS(avatar && avatar.large)}
          name={nickname}
          borderColor='transparent'
        />
        <Flex.Item style={_.ml.sm}>
          <Flex>
            <View>
              <Text type='tinygrailPlain'>{nickname}</Text>
              {$.advance ? (
                <Text size={12} type='warning'>
                  高级会员
                </Text>
              ) : (
                !!_loaded && (
                  <Text type='tinygrailText' size={12}>
                    普通会员
                  </Text>
                )
              )}
            </View>
            <IconTouchable
              style={_.ml.xs}
              name={_.tSelect('night', 'sun')}
              color={_.colorTinygrailText}
              size={18}
              onPress={_.toggleTinygrailThemeMode}
            />
          </Flex>
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  back: {
    marginLeft: -8
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
