/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:43:32
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
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
              <Touchable
                onPress={() => {
                  $.doSearchNumber(navigation, item)

                  t('人物直达.跳转', {
                    monoId: item
                  })
                }}
              >
                <Text type='tinygrailPlain' size={15}>
                  {$.chara(item).name || item}
                  {!!$.chara(item).id && ` #${$.chara(item).id}`}
                </Text>
              </Touchable>
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

export default ob(History, COMPONENT)
