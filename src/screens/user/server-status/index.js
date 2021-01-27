/* eslint-disable no-await-in-loop, consistent-return, func-names */
/*
 * @Author: czy0729
 * @Date: 2020-10-13 17:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:57:47
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Button, Activity, Heatmap } from '@components'
import { _ } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  HOST_MANGA,
  HOST_ANITAMA,
  URL_OAUTH,
  GITHUB_RELEASE_REPOS
} from '@constants'
import { API_CALENDAR } from '@constants/api'
import { CDN_ONAIR, CDN_DISCOVERY_HOME } from '@constants/cdn'
import {
  SITE_AGEFANS,
  SITE_XUNBO,
  SITE_77MH,
  SITE_COMIC123
} from '@constants/site'

const title = '网络探针'
const initList = [
  {
    title: 'https://bgm.tv',
    desc: '主站 (必要)',
    url: 'https://bgm.tv/about/copyright',
    msg: [],
    loading: false
  },
  {
    title: 'https://bangumi.tv',
    desc: '登陆验证码 (登陆必要)',
    url: 'https://bangumi.tv/about/copyright',
    msg: [],
    loading: false
  },
  {
    title: URL_OAUTH,
    desc: '授权登陆服务 (登陆必要)',
    url: URL_OAUTH,
    msg: [],
    loading: false
  },
  {
    title: 'https://api.bgm.tv',
    desc: '主站Api (必要)',
    url: API_CALENDAR(),
    msg: [],
    loading: false
  },
  {
    title: 'https://gitee.com',
    desc: 'CDN版本检测',
    url: 'https://gitee.com/a402731062/bangumi/raw/master/data.json',
    msg: [],
    loading: false
  },
  {
    title: 'https://cdn.jsdelivr.net',
    desc: 'CDN资源域',
    url: CDN_DISCOVERY_HOME(),
    msg: [],
    loading: false
  },
  {
    title: 'https://tinygrail.com',
    desc: '小圣杯Api',
    url: 'https://tinygrail.com',
    msg: [],
    loading: false
  },
  {
    title: GITHUB_RELEASE_REPOS,
    desc: 'App版本检测',
    url: GITHUB_RELEASE_REPOS,
    msg: [],
    loading: false
  },
  {
    title: 'https://bangumi-mosaic-tile.now.sh',
    desc: '进度瓷砖Api',
    url: 'https://bangumi-mosaic-tile.now.sh',
    msg: [],
    loading: false
  },
  {
    title: '/gh/ekibun/bangumi_onair',
    desc: '每日放送',
    url: CDN_ONAIR(),
    msg: [],
    loading: false
  },
  {
    title: HOST_MANGA,
    desc: '漫画阅读器',
    url: HOST_MANGA,
    msg: [],
    loading: false
  },
  {
    title: `${SITE_AGEFANS()}/update`,
    desc: 'Agefans',
    url: `${SITE_AGEFANS()}/update`,
    msg: [],
    loading: false
  },
  {
    title: `${SITE_XUNBO()}/search.php`,
    desc: '迅播动漫',
    url: `${SITE_XUNBO()}/search.php`,
    msg: [],
    loading: false
  },
  {
    title: `${SITE_77MH()}/m.php`,
    desc: '新新漫画',
    url: `${SITE_77MH()}/m.php`,
    msg: [],
    loading: false
  },
  {
    title: `${SITE_COMIC123()}/index.php/search.html`,
    desc: '漫画123',
    url: `${SITE_COMIC123()}/index.php/search.html`,
    msg: [],
    loading: false
  },
  {
    title: HOST_ANITAMA,
    desc: 'Anitama资讯',
    url: HOST_ANITAMA,
    msg: [],
    loading: false
  },
  {
    title: 'https://api.bilibili.com/pgc/web/season/section?season_id=1',
    desc: 'bilibili番剧预览图',
    url: 'https://api.bilibili.com/pgc/web/season/section?season_id=1',
    headers: {
      Referer: 'https://www.bilibili.com/'
    },
    msg: [],
    loading: false
  },
  {
    title: 'https://list.youku.com/show/module?id=1&tab=point&callback=jQuery',
    desc: 'youku番剧预览图',
    url: 'https://list.youku.com/show/module?id=1&tab=point&callback=jQuery',
    headers: {
      Referer: 'https://list.youku.com/'
    },
    msg: [],
    loading: false
  },
  {
    title: 'https://netaba.re',
    desc: 'Netabare动漫趋势',
    url: 'https://netaba.re',
    msg: [],
    loading: false
  },
  {
    title: 'https://imgchr.com',
    desc: '图床',
    url: 'https://imgchr.com',
    msg: [],
    loading: false
  }
]
const pingCount = 4

export default
@withHeader({
  screen: title,
  hm: ['server-status', 'ServerStatus']
})
@ob
class ServerStatus extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    list: JSON.parse(JSON.stringify(initList)),
    pinging: false
  }

  onPingOne = index => {
    const { list, pinging } = this.state
    if (pinging) {
      return
    }

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
        for (let ii = 0; ii < pingCount; ii += 1) {
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
    if (pinging) {
      return
    }

    t('网络探针.全部检测')

    this.setState(
      {
        list: JSON.parse(JSON.stringify(initList)),
        pinging: true
      },
      async () => {
        const { list } = this.state
        for (let i = 0; i < list.length; i += 1) {
          list[i].loading = true
          this.setState({
            list
          })

          for (let ii = 0; ii < pingCount; ii += 1) {
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

  computedStatus = msg => {
    let sum = 0

    // 通常第一个记录不准确很慢, 排除
    msg.filter((item, index) => !!index).forEach(item => (sum += item || 5000))

    const avg = sum / msg.length
    if (avg <= 150) {
      return 'Success'
    }

    if (avg <= 1000) {
      return 'Warning'
    }

    return 'Danger'
  }

  render() {
    const { list } = this.state
    const msDesc =
      '绿色 < 150ms，黄色 < 1000ms，红色 (或超时) > 1000ms (5000ms)\n若必要服务为红色则严重影响App的正常使用'
    return (
      <>
        <ScrollView
          style={_.container.plain}
          contentContainerStyle={this.styles.contentContainerStyle}
          scrollToTop
        >
          <Text style={_.mt.md} size={10} type='sub' lineHeight={12}>
            {msDesc}
          </Text>
          {list.map((item, index) => (
            <Flex key={item.title} style={_.mt.lg} align='start'>
              <View style={this.styles.desc}>
                <Text size={12}>
                  {index + 1}. {item.desc}
                </Text>
                <Text style={_.mt.xs} size={10} type='sub' selectable>
                  {item.title}
                </Text>
              </View>
              <Flex.Item style={_.ml.md}>
                {item.msg
                  .filter((item, index) => !!index)
                  .map((i, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Text key={idx} style={_.mb.xs} size={10}>
                      {i ? `${i}ms` : '>5000ms 超时'}
                    </Text>
                  ))}
              </Flex.Item>
              <Flex style={this.styles.result} justify='end'>
                {item.msg.length >= pingCount && (
                  <View
                    style={[
                      this.styles.status,
                      this.styles[`status${this.computedStatus(item.msg)}`]
                    ]}
                  />
                )}
                <Flex
                  style={{
                    width: 48
                  }}
                  justify='center'
                >
                  {item.loading ? (
                    <Activity />
                  ) : (
                    <Button
                      style={{
                        width: '100%'
                      }}
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
          <Button type='primary' onPress={this.onPing}>
            全部检测
          </Button>
          <Heatmap right={80} id='网络探针.全部检测' />
        </View>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom + _.lg
  },
  desc: {
    width: '48%'
  },
  btn: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 24,
    left: _.wind
  },
  status: {
    width: 8,
    height: 8,
    marginRight: _.md,
    borderRadius: 4
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusWarning: {
    backgroundColor: _.colorWarning
  },
  statusDanger: {
    backgroundColor: _.colorDanger
  }
}))

function ping(url, headers = {}) {
  return new Promise(resolve => {
    const start = new Date().getTime()
    const xhr = new XMLHttpRequest()
    const cb = function (response) {
      // 有数据就马上返回
      if (response.length > 10) {
        resolve(new Date().getTime() - start)
        return xhr.abort()
      }
    }

    xhr.onreadystatechange = function () {
      return cb(this._response)
    }
    xhr.onerror = () => resolve(0)
    xhr.ontimeout = () => resolve(0)

    xhr.open('GET', url, true)
    xhr.withCredentials = false
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.send()

    setTimeout(() => {
      resolve(0)
      return xhr.abort()
    }, 5000)
  })
}
