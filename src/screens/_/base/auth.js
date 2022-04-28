/*
 * @Author: czy0729
 * @Date: 2022-03-14 17:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 17:18:53
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Button, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import { StatusBarPlaceholder } from './status-bar-placeholder'
import { IconTouchable } from '../icon/touchable'

export const Auth = obc((props, { navigation }) => (
  <View style={_.container.plain}>
    <StatusBarPlaceholder />
    <Flex style={styles.toolbar}>
      <Touchable
        style={styles.zhinan}
        onPress={() => open('https://www.yuque.com/chenzhenyu-k0epm/znygb4')}
      >
        <Flex>
          <Iconfont name='md-chrome-reader-mode' color={_.colorDesc} size={20} />
          <Text style={_.ml.sm} size={13}>
            指南
          </Text>
        </Flex>
      </Touchable>
      <Flex.Item />
      <IconTouchable
        style={_.mr.xs}
        name='md-search'
        color={_.colorDesc}
        size={22}
        onPress={() => navigation.push('Search')}
      />
      <IconTouchable
        style={styles.setting}
        name='setting'
        color={_.colorDesc}
        size={18}
        onPress={() => navigation.push('Setting')}
      />
    </Flex>
    <Flex style={styles.go} direction='column' justify='center'>
      <Button style={styles.btn} shadow onPress={() => navigation.push('LoginV2')}>
        {i18n.login()}后管理进度
      </Button>
    </Flex>
  </View>
))

const styles = _.create({
  toolbar: {
    padding: _.sm
  },
  zhinan: {
    padding: _.sm,
    marginTop: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  btn: {
    width: 160 * _.ratio,
    marginTop: _.md,
    marginBottom: 96
  },
  setting: {
    marginTop: -3
  },
  go: {
    height: _.window.height - 120
  }
})
