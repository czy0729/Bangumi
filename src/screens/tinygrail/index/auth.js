/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:15:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconBack, IconTouchable, Avatar } from '@screens/_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils/app'
import { obc } from '@utils/decorators'
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
            key={tinygrailOSS(avatar && avatar.large)}
            style={styles.avatar}
            size={32}
            src={tinygrailOSS(avatar && avatar.large)}
            name={nickname}
            borderColor='transparent'
          />
          <Flex.Item style={_.ml.sm}>
            <Flex>
              <Touchable onPress={() => navigation.push('Qiafan')}>
                <Text type='tinygrailPlain' size={13} bold>
                  {nickname}
                </Text>
                {$.advance ? (
                  <Text size={11} lineHeight={12} type='warning'>
                    高级会员
                  </Text>
                ) : (
                  !!_loaded && (
                    <Text type='tinygrailText' size={11} lineHeight={12}>
                      普通会员
                    </Text>
                  )
                )}
              </Touchable>
              <IconTouchable
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

export default obc(Auth)

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
    marginLeft: -4,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
