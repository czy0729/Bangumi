/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 22:52:22
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
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
    <View>
      {_.isPad && (
        <IconBack
          style={styles.backIsPad}
          navigation={navigation}
          color={_.colorTinygrailPlain}
        />
      )}
      <View style={styles.container}>
        <Flex>
          {!_.isPad && (
            <IconBack
              style={styles.back}
              navigation={navigation}
              color={_.colorTinygrailPlain}
            />
          )}
          <Avatar
            style={styles.avatar}
            size={32}
            src={tinygrailOSS(avatar && avatar.large)}
            name={nickname}
            borderColor='transparent'
          />
          <Flex.Item style={_.ml.sm}>
            <Flex>
              <Touchable onPress={() => navigation.push('Qiafan')}>
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
              </Touchable>
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
  backIsPad: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: _._wind
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
