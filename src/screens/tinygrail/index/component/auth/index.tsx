/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:58:03
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, Touchable } from '@components'
import { IconBack, IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { feedback, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import Btns from '../btns'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Auth() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
                {nickname}
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
  })
}

export default Auth
