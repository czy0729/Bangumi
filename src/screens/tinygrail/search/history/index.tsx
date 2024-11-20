/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:44:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function History({ style }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { history } = $.state
  return (
    <View style={style}>
      {history.map((item, index) => (
        <View key={index} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text
                type='tinygrailPlain'
                size={15}
                onPress={() => {
                  t('人物直达.跳转', {
                    monoId: item
                  })

                  $.doSearchNumber(navigation, item)
                }}
              >
                {$.chara(item).name || item}
                {!!$.chara(item).id && ` #${$.chara(item).id}`}
              </Text>
            </Flex.Item>
            <Touchable style={styles.close} onPress={() => $.deleteHistory(item)}>
              <Iconfont name='md-close' color={_.colorTinygrailPlain} />
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default ob(History)
