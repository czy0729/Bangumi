/*
 * @Author: czy0729
 * @Date: 2020-10-13 17:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:01:30
 */
import React from 'react'
import { View } from 'react-native'
import { Activity, Button, Component, Flex, HeaderV2, Heatmap, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ping, t } from '@utils/fetch'
import { getSitesList } from './utils'
import { HM } from './ds'
import { memoStyles } from './styles'

/** 最大尝试访问次数 */
const PING_COUNTS = 4

/** 网络探针 */
class ServerStatus extends React.Component {
  state = {
    list: getSitesList(),
    pinging: false
  }

  onPingOne = (index: number) => {
    const { list, pinging } = this.state
    if (pinging) return

    t('网络探针.检测', {
      index
    })

    list[index].msg = []
    list[index].loading = true
    this.setState(
      {
        list,
        pinging: true
      },
      async () => {
        const { list } = this.state
        for (let ii = 0; ii < PING_COUNTS; ii += 1) {
          const detail = await ping(list[index].url, list[index].headers)
          list[index].msg.push(detail)
          this.setState({
            list
          })
        }

        list[index].loading = false
        this.setState({
          list,
          pinging: false
        })
      }
    )
  }

  onPing = () => {
    const { pinging } = this.state
    if (pinging) return

    t('网络探针.全部检测')

    this.setState(
      {
        list: getSitesList(),
        pinging: true
      },
      async () => {
        const { list } = this.state
        for (let i = 0; i < list.length; i += 1) {
          list[i].loading = true
          this.setState({
            list
          })

          for (let ii = 0; ii < PING_COUNTS; ii += 1) {
            const detail = await ping(list[i].url, list[i].headers)
            list[i].msg.push(detail)
            this.setState({
              list
            })
          }

          list[i].loading = false
          this.setState({
            list
          })
        }

        this.setState({
          pinging: false
        })
      }
    )
  }

  computedStatus = (msg: any[]) => {
    let sum = 0

    // 通常第一个记录不准确很慢, 排除
    msg.filter((_item, index) => !!index).forEach(item => (sum += item || 5000))

    const avg = sum / msg.length
    if (avg <= 150) return 'Success'
    if (avg <= 1000) return 'Warning'
    return 'Danger'
  }

  render() {
    const { list } = this.state
    return (
      <Component id='screen-server-status'>
        <ScrollView
          style={_.container.plain}
          contentContainerStyle={this.styles.contentContainerStyle}
          scrollToTop
        >
          <Text style={_.mt.md} size={12} lineHeight={14} type='sub'>
            <Text size={12} lineHeight={14} type='success'>
              绿色 {'<'} 150ms
            </Text>
            ，
            <Text size={12} lineHeight={14} type='warning'>
              黄色 {'<'} 1000ms
            </Text>
            ，
            <Text size={12} lineHeight={14} type='danger'>
              红色 (或超时) {'>'} 1000ms (5000ms)
            </Text>{' '}
            ，若必要服务为红色则严重影响 App 的正常使用
          </Text>
          {list.map((item, index) => (
            <Flex key={item.title} style={_.mt.lg} align='start'>
              <View style={this.styles.desc}>
                <Text bold>
                  {index + 1}. {item.desc}
                </Text>
                <Text style={_.mt.xs} size={12} type='sub' selectable>
                  {item.title}
                </Text>
              </View>
              <Flex.Item style={_.ml.md}>
                {item.msg
                  .filter((_item, index) => !!index)
                  .map((i, idx) => (
                    <Text key={idx} style={_.mb.xs} size={10} noWrap>
                      {i ? `${i}ms` : '>5000ms 超时'}
                    </Text>
                  ))}
              </Flex.Item>
              <Flex justify='end'>
                {item.msg.length >= PING_COUNTS && (
                  <View
                    style={[
                      this.styles.status,
                      this.styles[`status${this.computedStatus(item.msg)}`]
                    ]}
                  />
                )}
                <Flex style={this.styles.loading} justify='end'>
                  {item.loading ? (
                    <Flex style={this.styles.activity} justify='center'>
                      <Activity />
                    </Flex>
                  ) : (
                    <Button
                      style={this.styles.btnCheck}
                      type='plain'
                      size='sm'
                      onPress={() => this.onPingOne(index)}
                    >
                      检测
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </ScrollView>
        <View style={this.styles.btn}>
          <Button type='bid' onPress={this.onPing}>
            全部检测
          </Button>
          <Heatmap right={80} id='网络探针.全部检测' />
        </View>
        <HeaderV2 title='网络探针' hm={HM} />
      </Component>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(ServerStatus)
