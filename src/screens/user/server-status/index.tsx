/*
 * @Author: czy0729
 * @Date: 2020-10-13 17:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 逐个检测客户端依赖的站点与服务延迟
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  Activity,
  Button,
  Component,
  Flex,
  HeaderPlaceholder,
  HeaderV2,
  Heatmap,
  ScrollView,
  Text
} from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { useServerStatusPage } from './hooks'
import { getStatus } from './utils'
import { HM, PING_TIMEOUT, STATUS_FAST, STATUS_OK } from './ds'
import { memoStyles } from './styles'

/** 网络探针 */
function ServerStatus() {
  const { list, mode, pingOne, pingAll } = useServerStatusPage()

  const styles = memoStyles()

  return (
    <Component id='screen-server-status'>
      <HeaderPlaceholder />
      <Notice>
        <Text size={12} lineHeight={13} bold>
          旧探针已废弃，请点击设置页面右上角电波图标查看新探针。
        </Text>
      </Notice>
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={stl(_.container.bottom, _.container.wind)}
        scrollToTop
      >
        <Text style={_.mt.md} size={12} lineHeight={14} type='sub'>
          <Text size={12} lineHeight={14} type='success'>
            绿色 {'<'} {STATUS_FAST}ms
          </Text>
          ，
          <Text size={12} lineHeight={14} type='warning'>
            黄色 {'<'} {STATUS_OK}ms
          </Text>
          ，
          <Text size={12} lineHeight={14} type='danger'>
            红色 (或失败) {'>'} {STATUS_OK}ms
          </Text>
          ，单次探测 {PING_TIMEOUT}ms 无响应按失败计，若必要服务为红色则严重影响 App 的正常使用
        </Text>
        {list.map((item, index) => (
          <Flex key={`${item.url}-${index}`} style={_.mt.lg} align='start'>
            <View style={styles.desc}>
              <Text bold>
                {index + 1}. {item.desc}
              </Text>
              <Text style={_.mt.xs} size={12} type='sub' selectable>
                {item.url}
              </Text>
            </View>
            <Flex.Item style={_.ml.md}>
              {item.msg.map((latency, idx) => (
                <Text key={idx} style={_.mb.xs} size={10} noWrap>
                  {latency ? `${latency}ms` : '失败 / 超时'}
                </Text>
              ))}
            </Flex.Item>
            <Flex justify='end'>
              {!item.loading && !!item.msg.length && (
                <View style={stl(styles.status, styles[getStatus(item.msg)])} />
              )}
              <Flex style={styles.loading} justify='end'>
                {item.loading ? (
                  <Flex style={styles.activity} justify='center'>
                    <Activity />
                  </Flex>
                ) : (
                  <Button
                    style={styles.btnCheck}
                    type={mode === 'idle' ? 'plain' : 'disabled'}
                    size='sm'
                    onPress={mode === 'idle' ? () => pingOne(index) : undefined}
                  >
                    检测
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </ScrollView>
      <View style={styles.btn}>
        <Button
          type={mode === 'one' ? 'disabled' : 'bid'}
          loading={mode === 'all'}
          onPress={mode === 'one' ? undefined : pingAll}
        >
          全部检测
        </Button>
        <Heatmap right={80} id='网络探针.全部检测' />
      </View>
      <HeaderV2 title='网络探针' hm={HM} />
    </Component>
  )
}

export default observer(ServerStatus)
