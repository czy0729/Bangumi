/*
 * @Author: czy0729
 * @Date: 2022-03-14 17:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 17:15:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Button, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { URL_ZHINAN } from '@constants'
import i18n from '@constants/i18n'
import { StatusBarPlaceholder } from '../status-bar-placeholder'
import { IconTouchable } from '../../icon/touchable'
import { styles } from './styles'

export const Auth = obc((props, { navigation }) => (
  <View style={_.container.plain}>
    <StatusBarPlaceholder />
    <Flex style={styles.toolbar}>
      <Touchable style={styles.zhinan} onPress={() => open(URL_ZHINAN)}>
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
