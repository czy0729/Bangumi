/*
 * @Author: czy0729
 * @Date: 2019-09-04 21:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:18:35
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { IconBack, IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Btns from '../btns'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Auth() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { nickname, avatar } = $.userInfo
  return (
    <Flex style={_.mb.sm}>
      {!$.params.fromBottomTab && (
        <IconBack style={styles.back} navigation={navigation} color={_.colorTinygrailPlain} />
      )}
      <Avatar
        key={tinygrailOSS(avatar?.large)}
        src={tinygrailOSS(avatar?.large)}
        size={36}
        name={nickname}
        borderColor='transparent'
        skeletonType='tinygrail'
      />
      <Flex.Item>
        <Flex>
          <Touchable style={styles.touch} onPress={() => navigation.push('Qiafan')}>
            <Text type='tinygrailPlain' size={13} bold>
              {nickname}
            </Text>
            {$.advance ? (
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

export default ob(Auth, COMPONENT)
