/*
 * @Author: czy0729
 * @Date: 2023-03-10 18:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * Webhook: 开关 + 地址配置 + 请求日志
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  Component,
  Expand,
  Flex,
  HeaderPlaceholder,
  Input,
  Page,
  ScrollView,
  SwitchPro,
  Text
} from '@components'
import { _, systemStore } from '@stores'
import { date } from '@utils'
import { logs } from '@utils/webhooks'
import Header from './header'
import { PLACEHOLDER } from './ds'
import { memoStyles } from './styles'

/** Webhook */
function Webhook() {
  const styles = memoStyles()
  const { webhook, webhookUrl } = systemStore.setting

  const handleSwitch = useCallback(() => {
    systemStore.switchSetting('webhook')
  }, [])

  const handleChangeText = useCallback((text: string) => {
    systemStore.setSetting('webhookUrl', text.trim())
  }, [])

  return (
    <Component id='screen-webhook'>
      <Page style={_.container.wind}>
        <HeaderPlaceholder style={_.mt.sm} />
        <Flex>
          <Flex.Item>
            <Text size={15} bold>
              启用
              <Text size={12} lineHeight={15} type='sub' bold>
                {'  '}不清楚什么用途的请勿开启
              </Text>
            </Text>
          </Flex.Item>
          <SwitchPro style={styles.switch} value={webhook} onSyncPress={handleSwitch} />
        </Flex>
        <View style={_.mt.md}>
          <Text size={15} bold>
            地址
          </Text>
          <Input
            style={styles.input}
            placeholder={PLACEHOLDER}
            multiline
            numberOfLines={3}
            defaultValue={webhookUrl || ''}
            onChangeText={handleChangeText}
          />
        </View>
        <ScrollView style={_.mt.md} contentContainerStyle={styles.scrollView}>
          {logs.map(item => (
            <View key={item.id} style={styles.item}>
              <Expand ratio={2} linearGradient={false}>
                <Flex>
                  <Text
                    type={
                      item.label === 'ERROR' ? 'danger' : item.label === 'POST' ? 'bid' : 'warning'
                    }
                    bold
                  >
                    {item.label}
                  </Text>
                  <Text style={_.ml.sm} type='sub' bold>
                    {date('y-m-d H:i:s', item.ts)}
                  </Text>
                </Flex>
                <Text style={_.mt.sm} size={12}>
                  {item.content}
                </Text>
              </Expand>
            </View>
          ))}
        </ScrollView>
      </Page>
      <Header />
    </Component>
  )
}

export default observer(Webhook)
