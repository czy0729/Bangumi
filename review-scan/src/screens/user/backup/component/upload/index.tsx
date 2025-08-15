/*
 * @Author: czy0729
 * @Date: 2022-12-06 06:14:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:33:21
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Btn from '../btn'
import { injectedHTML } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Upload() {
  const { $ } = useStore<Ctx>()
  if (!$.state.modal) return null

  const styles = memoStyles()
  return (
    <>
      <View style={styles.mask} />
      <View style={styles.fixed}>
        <View style={styles.container}>
          <WebView
            containerStyle={styles.webview}
            source={{
              html: injectedHTML()
            }}
            androidHardwareAccelerationDisabled
            androidLayerType='software'
            javaScriptEnabled
            onMessage={event => {
              const { data } = JSON.parse(event.nativeEvent.data)
              $.onMessage(data)
            }}
          />
        </View>
        <View style={styles.body}>
          <Text bold size={15}>
            点击上方按钮导入 CSV 文件
          </Text>
          <Flex style={_.mt.lg} justify='center'>
            <Btn
              style={styles.btn}
              btnStyle={styles.btnStyle}
              text='收起'
              size={13}
              onPress={$.onToggleUpload}
            />
          </Flex>
        </View>
      </View>
    </>
  )
}

export default ob(Upload, COMPONENT)
