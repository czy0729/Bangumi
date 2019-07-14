/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 17:34:06
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage } from 'react-native'
import { Constants } from 'expo'
import cheerio from 'cheerio-without-node-native'
import {
  Flex,
  Text,
  Touchable,
  Image,
  Input,
  Button,
  KeyboardSpacer
} from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { userStore } from '@stores'
import { urlStringify, getTimestamp } from '@utils'
import { hm } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST, APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import _ from '@styles'

function xhr({ method = 'GET', url, data, headers = {}, responseType } = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(this)
      }
    }
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }
    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }
    xhr.onabort = function() {
      reject(new TypeError('AbortError'))
    }

    request.open(method, url, true)
    request.withCredentials = false
    if (responseType) {
      request.responseType = responseType
    }
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data ? urlStringify(data) : null
    request.send(body)
  })
}

const title = '登陆V2'

export default class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    loading: false,
    info: ''
  }

  userAgent = ''
  formhash = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }
  code = ''
  accessToken = ''

  async componentDidMount() {
    this.userAgent = await Constants.getWebViewUserAgentAsync()

    // await this.logout()
    await this.getFormHash()
    await this.getCaptcha()

    hm('login?v=2', title)
  }

  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onLogin = () => {
    this.setState({
      clicked: true
    })
  }

  logout = () =>
    xhr({
      url: `${HOST}/logout/7dd16c5e`,
      headers: {
        'User-Agent': this.userAgent
      }
    })

  getFormHash = async () => {
    const res = xhr({
      url: `${HOST}/login`,
      headers: {
        'User-Agent': this.userAgent
      }
    })

    const { responseHeaders, _response } = await res
    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_sid=(.+?);/)
      if (match) {
        this.cookie.chiiSid = match[1]
      }
    }

    const match = _response.match(
      /<input type="hidden" name="formhash" value="(.+?)">/
    )
    if (match) {
      this.formhash = match[1]
    }

    return res
  }

  getCaptcha = async () => {
    const res = xhr({
      url: `${HOST}/signup/captcha?state=${getTimestamp()}`,
      headers: {
        Cookie: `chii_sid=${this.cookie.chiiSid}`,
        'User-Agent': this.userAgent
      },
      responseType: 'arraybuffer'
    })

    const { _response } = await res
    this.setState({
      base64: `data:image/gif;base64,${_response}`
    })

    return res
  }

  login = async () => {
    const { loading, email, password, captcha } = this.state
    if (loading) {
      return
    }

    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    this.setState({
      loading: true,
      info: '登陆请求中...'
    })

    try {
      const { responseHeaders } = await xhr({
        method: 'POST',
        url: `${HOST}/FollowTheRabbit`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `chii_sid=${this.cookie.chiiSid}`,
          'User-Agent': this.userAgent,
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive'
        },
        data: {
          formhash: this.formhash,
          referer: '',
          dreferer: '',
          email,
          password,
          captcha_challenge_field: captcha,
          loginsubmit: '登录'
        }
      })

      if (responseHeaders['Set-Cookie']) {
        const match = responseHeaders['Set-Cookie'].match(/chii_auth=(.+?);/)
        if (match) {
          this.cookie.chiiAuth = match[1]
        }
      }

      if (!this.cookie.chiiAuth) {
        this.setState({
          loading: false,
          info: '登陆失败, 请重试或点击这里前往旧版登陆 >'
        })
        return
      }

      this.setState({
        info: '获取授权表单码...'
      })
      await this.oauth()

      this.setState({
        info: '授权中...'
      })
      await this.authorize()

      this.setState({
        info: '授权成功, 获取token中...'
      })
      const { _response } = await this.getAccessToken()

      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      this.inStore()
      this.setState({
        loading: false,
        info: '登陆成功, 正在请求个人信息...'
      })
    } catch (ex) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或点击这里前往旧版登陆 >'
      })
    }
  }

  oauth = async () => {
    const res = xhr({
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URL}`,
      headers: {
        Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${
          this.cookie.chiiAuth
        }`,
        'User-Agent': this.userAgent
      }
    })

    const { _response } = await res
    this.formhash = cheerio
      .load(_response)('input[name=formhash]')
      .attr('value')
    return res
  }

  authorize = async () => {
    const res = xhr({
      method: 'POST',
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${
          this.cookie.chiiAuth
        }`,
        'User-Agent': this.userAgent
      },
      data: {
        formhash: this.formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      }
    })

    const { responseURL } = await res
    this.code = responseURL
      .split('=')
      .slice(1)
      .join('=')
    return res
  }

  getAccessToken = () =>
    xhr({
      method: 'POST',
      url: `${HOST}/oauth/access_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': this.userAgent
      },
      data: {
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: this.code,
        redirect_uri: OAUTH_REDIRECT_URL,
        state: getTimestamp()
      }
    })

  inStore = async () => {
    const { navigation } = this.props
    userStore.updateUserCookie({
      cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${
        this.cookie.chiiAuth
      }`,
      userAgent: this.userAgent
    })
    await userStore.fetchUserInfo()
    navigation.popToTop()
  }

  onChange = (evt, type) => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      [type]: text,
      info: ''
    })
  }

  renderPreview() {
    return (
      <View style={[_.container.column, styles.gray]}>
        <Image
          style={styles.gray}
          width={160}
          height={128}
          src={require('@assets/screens/login/login.png')}
        />
        <View style={[styles.bottomContainer, _.mt.md]}>
          <Button type='main' shadow onPress={this.onLogin}>
            账号登录
          </Button>
          <Button style={_.mt.md} type='plain' shadow onPress={this.onTour}>
            游客访问
          </Button>
        </View>
      </View>
    )
  }

  renderForm() {
    const { email, password, captcha, base64, loading, info } = this.state
    return (
      <View style={[_.container.column, styles.gray]}>
        <View style={styles.form}>
          <Flex justify='center'>
            <Image
              style={styles.gray}
              width={160}
              height={128}
              src={require('@assets/screens/login/login.png')}
            />
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={email}
                placeholder='Email'
                onChange={evt => this.onChange(evt, 'email')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={password}
                placeholder='密码'
                onChange={evt => this.onChange(evt, 'password')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={captcha}
                placeholder='验证'
                onChange={evt => this.onChange(evt, 'captcha')}
              />
            </Flex.Item>
            <Touchable
              style={styles.captchaContainer}
              onPress={this.getCaptcha}
            >
              {!!base64 && (
                <RNImage style={styles.captcha} source={{ uri: base64 }} />
              )}
            </Touchable>
          </Flex>
          <Button
            style={_.mt.lg}
            type='main'
            shadow
            loading={loading}
            onPress={this.login}
          >
            登陆
          </Button>
          <Text
            style={[
              _.mt.md,
              {
                height: 16
              }
            ]}
            size={12}
            type='sub'
            onPress={() => {
              if (info.includes('登陆失败')) {
                const { navigation } = this.props
                navigation.push('Login')
              }
            }}
          >
            {info}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { clicked } = this.state
    return (
      <View style={[_.container.flex, styles.gray]}>
        <StatusBar />
        <StatusBarPlaceholder style={styles.gray} />
        <View style={_.container.flex}>
          {clicked ? this.renderForm() : this.renderPreview()}
        </View>
        {clicked ? (
          <Text style={styles.ps} size={12} type='sub'>
            隐私策略: 我们十分尊重您的个人隐私, 这些信息仅存储于您的设备中,
            我们不会收集上述信息.
          </Text>
        ) : (
          <Text
            style={styles.old}
            type='sub'
            onPress={() => {
              const { navigation } = this.props
              navigation.push('Login')
            }}
          >
            旧版授权登陆
          </Text>
        )}
        <KeyboardSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  old: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.bottom,
    left: 0,
    width: '100%',
    padding: _.sm,
    textAlign: 'center'
  },
  bottomContainer: {
    width: 280,
    height: 350
  },
  form: {
    width: 280,
    paddingBottom: 82
  },
  input: {
    height: 44
  },
  captchaContainer: {
    width: 118,
    height: 44,
    marginLeft: _.sm,
    backgroundColor: _.colorBg
  },
  captcha: {
    width: 118,
    height: 44
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
})
