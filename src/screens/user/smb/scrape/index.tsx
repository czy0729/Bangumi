/*
 * @Author: czy0729
 * @Date: 2023-11-26 17:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 18:09:29
 */
import React from 'react'
import { View } from 'react-native'
import { Modal, Text, Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Scrape(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { extendsJAVisible, extendsJA } = $.state
  return (
    <Modal
      style={styles.modal}
      visible={extendsJAVisible}
      title='扩展刮削词'
      onClose={$.onCloseExtendsJA}
    >
      <View style={styles.body}>
        <Text size={12} bold type='sub'>
          若你并不想修改本地，也可以在下面输入一些文件夹关键词匹配指定条目。
        </Text>
        <Text style={_.mt.xs} size={12} bold type='sub'>
          一行一个，举例（注意是半角逗号）：Tenten Kakumei, 395714
        </Text>
        <Input
          style={styles.input}
          inputStyle={styles.multilineInputStyle}
          defaultValue={extendsJA.value}
          placeholder={'关键字, 条目数字id'}
          multiline
          numberOfLines={10}
          textAlignVertical='top'
          onChangeText={text => {
            $.setState({
              extendsJA: {
                value: text
              }
            })
          }}
        />
      </View>
    </Modal>
  )
}

export default obc(Scrape)
