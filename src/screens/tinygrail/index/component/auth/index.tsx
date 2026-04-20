/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 18:05:30
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { IconBack, IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { feedback, HTMLDecode, tinygrailOSS } from '@utils'
import Btns from '../btns'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Auth() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { nickname, avatar } = $.userInfo
  const src = tinygrailOSS(avatar?.large)

  return (
    <Flex style={_.mb.sm}>
      {!$.params.fromBottomTab && (
        <IconBack style={styles.back} navigation={navigation} color={_.colorTinygrailPlain} />
      )}
      <Avatar
        key={src}
        src={src}
        size={36}
        name={nickname}
        borderColor='transparent'
        skeletonType='tinygrail'
      />
      <Flex.Item>
        <Flex>
          <View style={styles.touch}>
            <Text type='tinygrailPlain' size={13} bold>
              {HTMLDecode(nickname)}
            </Text>
            <Touchable onPress={() => navigation.push('Qiafan')}>
              {systemStore.advance ? (
                <Text size={11} lineHeight={13} type='warning'>
                  高级会员
                </Text>
              ) : (
                !!$.state._loaded && (
                  <Text type='tinygrailText' size={11} lineHeight={13}>
                    普通会员
                  </Text>
                )
              )}
            </Touchable>
          </View>
          <IconTouchable
            style={_.ml._xs}
            name={_.select('md-brightness-5', 'md-brightness-2')}
            color={_.colorTinygrailPlain}
            size={18}
            onPress={() => {
              setTimeout(() => {
                _.toggleMode()
                feedback()
              }, 40)
            }}
          />
        </Flex>
      </Flex.Item>
      <Btns />
    </Flex>
  )
}

export default observer(Auth)
