/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 04:28:54
 */
import React from 'react'
import { Alert } from 'react-native'
import { IconHeader } from '@_'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Favor from './favor'

const defaultProps = {
  navigation: {},
  monoId: '',
  canICO: false,
  icoUsers: undefined,
  doICO: Function.prototype
}

const Extra = memo(({ navigation, monoId, canICO, icoUsers, doICO }) => {
  global.rerender('Mono.Extra.Main')

  if (canICO) {
    return (
      <Touchable
        style={_.container.touch}
        onPress={() =>
          Alert.alert('提示', '花费10000cc启动ICO?', [
            {
              text: '取消',
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => doICO(navigation)
            }
          ])
        }
      >
        <Flex style={_.mr.sm}>
          <IconHeader name='trophy' size={18} />
          <Text size={13}>启动ICO</Text>
        </Flex>
      </Touchable>
    )
  }

  return (
    <IconHeader
      style={_.mr.xs}
      name='trophy'
      size={18}
      onPress={() => {
        const path = icoUsers ? 'TinygrailICODeal' : 'TinygrailDeal'
        t('人物.跳转', {
          to: path,
          monoId
        })

        navigation.push(path, {
          monoId
        })
      }}
    >
      <Heatmap right={173} id='人物.启动ICO' transparent />
      <Heatmap
        right={109}
        id='人物.跳转'
        to='TinygrailICODeal'
        alias='ICO'
        transparent
      />
      <Heatmap right={30} id='人物.跳转' to='TinygrailDeal' alias='交易' />
    </IconHeader>
  )
}, defaultProps)

export default ob(({ $, navigation }) => {
  global.rerender('Mono.Extra')

  return (
    <>
      {$.monoId.includes('character') && $.tinygrail && (
        <Extra
          navigation={navigation}
          monoId={$.monoId}
          canICO={$.canICO}
          doICO={$.doICO}
          icoUsers={$.chara.users}
        />
      )}
      <Favor $={$} />
    </>
  )
})
