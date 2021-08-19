/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-19 10:09:26
 */
import React from 'react'
import { Alert } from 'react-native'
import { IconHeader } from '@screens/_'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'
import { t } from '@utils/fetch'

const defaultProps = {
  navigation: {},
  monoId: '',
  canICO: false,
  icoUsers: undefined,
  doICO: Function.prototype
}

const Extra = memo(({ navigation, monoId, canICO, icoUsers, doICO }) => {
  rerender('Mono.Extra.Main')

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
          <IconHeader name='trophy' size={19} />
          <Text size={13}>启动ICO</Text>
        </Flex>
      </Touchable>
    )
  }

  return (
    <IconHeader
      name='trophy'
      size={19}
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
        data={{
          to: 'TinygrailICODeal',
          alias: 'ICO'
        }}
        transparent
      />
      <Heatmap
        right={30}
        id='人物.跳转'
        data={{
          to: 'TinygrailDeal',
          alias: '交易'
        }}
      />
    </IconHeader>
  )
}, defaultProps)

export default ob(({ $, navigation }) => {
  rerender('Mono.Extra')

  if (!$.tinygrail) return null

  return (
    <Extra
      navigation={navigation}
      monoId={$.monoId}
      canICO={$.canICO}
      doICO={$.doICO}
      icoUsers={$.chara.users}
    />
  )
})
