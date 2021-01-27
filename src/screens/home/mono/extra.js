/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:52:22
 */
import React from 'react'
import { Alert } from 'react-native'
import { IconHeader } from '@screens/_'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'

function Extra({ $, navigation }) {
  if (!$.tinygrail) {
    return null
  }

  if ($.canICO) {
    return (
      <Touchable
        onPress={() =>
          Alert.alert('提示', '花费10000cc启动ICO?', [
            {
              text: '取消',
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => $.doICO(navigation)
            }
          ])
        }
      >
        <Flex style={_.mr.sm}>
          <IconHeader name='trophy' />
          <Text size={12}>启动ICO</Text>
        </Flex>
      </Touchable>
    )
  }

  return (
    <IconHeader
      name='trophy'
      onPress={() => {
        const path = $.chara.users ? 'TinygrailICODeal' : 'TinygrailDeal'
        t('人物.跳转', {
          to: path,
          monoId: $.monoId
        })

        navigation.push(path, {
          monoId: $.monoId
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
}

export default ob(Extra)
