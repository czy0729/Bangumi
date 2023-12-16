/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:55:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconBack, IconTouchable, Avatar } from '@_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import Btns from '../btns'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Auth(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { _loaded } = $.state
  const { nickname, avatar } = $.userInfo

  return (
    <Flex style={_.mb.sm}>
      <IconBack
        style={styles.back}
        navigation={navigation}
        color={_.colorTinygrailPlain}
      />
      <View style={_.ml.xs}>
        <Avatar
          key={tinygrailOSS(avatar?.large)}
          src={tinygrailOSS(avatar?.large)}
          size={36}
          name={nickname}
          borderColor='transparent'
        />
      </View>
      <Flex.Item>
        <Flex>
          <Touchable style={styles.touch} onPress={() => navigation.push('Qiafan')}>
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
            style={_.ml._xs}
            name={_.tSelect('md-brightness-2', 'md-brightness-5')}
            color={_.colorTinygrailPlain}
            size={18}
            onPress={() => {
              _.toggleTinygrailThemeMode()

              setTimeout(() => {
                if (_.tinygrailThemeMode !== _.mode) _.toggleMode()
              }, 40)
            }}
          />
        </Flex>
      </Flex.Item>
      <Btns />
    </Flex>
  )
}

export default obc(Auth)
