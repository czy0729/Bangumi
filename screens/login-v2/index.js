/* eslint-disable prefer-destructuring */
/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-10 01:18:47
 */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Constants } from 'expo'
import { Input, Button, Touchable } from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { userStore } from '@stores'
import { urlStringify, getTimestamp } from '@utils'
import _ from '@styles'

// config
const email = '402731062@qq.com'
const password = '84783019'
const client_id = 'bgm8885c4d524cd61fc'
const client_secret = '1da52e7834bbb73cca90302f9ddbc8dd'
let user_agent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'

export default class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    state: getTimestamp(),
    formhash: '',
    captcha: '',
    base64: ''
  }

  cookie = {
    chiiSid: ''
  }

  async componentDidMount() {
    user_agent = await Constants.getWebViewUserAgentAsync()

    // await this.logout()
    await this.getFormHashXHR(() => {
      setTimeout(() => {
        this.getCaptcha()
      }, 2000)
    })
  }

  refresh = () => {
    this.setState({
      state: 0
    })

    setTimeout(() => {
      this.setState({
        state: getTimestamp()
      })
    }, 400)
  }

  onChange = evt => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      captcha: text
    })
  }

  logout = async () => {
    const res = fetch('https://bangumi.tv/logout/7dd16c5e', {
      method: 'GET'
    })
    return res
  }

  getFormHash = async () => {
    const res = fetch('https://bangumi.tv/login', {
      method: 'GET',
      headers: {
        'User-Agent': user_agent
      },
      credentials: 'omit'
    })
    const data = await res

    // set-cookie
    if (data.headers) {
      const setCookie = data.headers.get('set-cookie')
      if (setCookie) {
        const match = setCookie.match(/chii_sid=(.+?);/)
        if (match) {
          this.cookie.chiiSid = match[1]
        }
      }
    }

    // formhash
    let formhash = ''
    if (data._bodyInit) {
      const match = data._bodyInit.match(
        /<input type="hidden" name="formhash" value="(.+?)">/
      )
      if (match) {
        formhash = match[1]
      }
    }

    this.setState({
      formhash
    })

    return res
  }

  getFormHashXHR = async cb => {
    const request = new XMLHttpRequest()
    const that = this

    // eslint-disable-next-line func-names, space-before-function-paren
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        log(this)

        // set-cookie
        if (this.responseHeaders['Set-Cookie']) {
          const match = this.responseHeaders['Set-Cookie'].match(
            /chii_sid=(.+?);/
          )
          if (match) {
            that.cookie.chiiSid = match[1]
          }
        }

        // formhash
        let formhash = ''
        const match = this._response.match(
          /<input type="hidden" name="formhash" value="(.+?)">/
        )
        if (match) {
          formhash = match[1]
        }

        that.setState(
          {
            formhash
          },
          () => {
            cb()
          }
        )
      }
    }
    request.withCredentials = false
    request.open('GET', 'https://bangumi.tv/login', true)
    request.setRequestHeader('User-Agent', user_agent)
    request.send()
  }

  getCaptcha = async () => {
    const { state } = this.state
    const request = new XMLHttpRequest()
    const that = this
    // eslint-disable-next-line func-names, space-before-function-paren
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        log(this)
        console.log('======================')
        that.setState({
          base64: `data:image/gif;base64,${this._response}`
        })
      }
    }
    request.withCredentials = false
    request.responseType = 'arraybuffer'
    request.open(
      'GET',
      `https://bangumi.tv/signup/captcha?state=${state}`,
      true
    )
    request.setRequestHeader('Cookie', `; chii_sid=${this.cookie.chiiSid};`)
    request.setRequestHeader('User-Agent', user_agent)
    request.send()
  }

  login = async () => {
    const { formhash, captcha } = this.state
    const res = fetch('https://bangumi.tv/FollowTheRabbit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `; chii_sid=${this.cookie.chiiSid};`,
        'User-Agent': user_agent
      },
      credentials: 'omit',
      body: urlStringify({
        formhash,
        referer: '',
        dreferer: '',
        email,
        password,
        captcha_challenge_field: captcha,
        loginsubmit: '登录'
      })
    })
    const data = await res
    log(data)

    if (data.headers) {
      const setCookie = data.headers.get('set-cookie')
      if (setCookie) {
        const match = setCookie.match(/chii_auth=(.+?);/)
        if (match) {
          this.cookie.chiiAuth = match[1]
          userStore.replaceUserCookie(this.cookie.chiiSid, this.cookie.chiiAuth)
        }
      }
    }

    return res
  }

  loginXHR = async () => {
    const { formhash, captcha } = this.state
    const request = new XMLHttpRequest()
    const that = this

    // eslint-disable-next-line func-names, space-before-function-paren
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        log(this)
      }
    }
    request.withCredentials = false
    request.open('POST', 'https://bangumi.tv/FollowTheRabbit', true)
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded'
    )
    request.setRequestHeader('Cookie', `; chii_sid=${this.cookie.chiiSid};`)
    request.setRequestHeader('User-Agent', user_agent)
    request.send(
      urlStringify({
        formhash,
        referer: '',
        dreferer: '',
        email,
        password,
        captcha_challenge_field: captcha,
        loginsubmit: '登录'
      })
    )
  }

  oauth = async () => {}

  render() {
    const { captcha, base64 } = this.state
    console.log(base64)
    return (
      <View style={[_.container.flex, styles.gray]}>
        <StatusBar />
        <StatusBarPlaceholder style={styles.gray} />
        {/* {!!state && (
          <Touchable onPress={this.refresh}>
            <Image
              source={{
                uri: `https://bangumi.tv/signup/captcha?state=${state}`,
                method: 'POST',
                credentials: 'include'
              }}
              style={{
                width: 160,
                height: 60
              }}
            />
          </Touchable>
        )} */}
        {!!base64 && (
          <Image
            source={{ uri: base64 }}
            style={{
              width: 160,
              height: 60
            }}
          />
        )}
        <Input value={captcha} onChange={this.onChange} />
        <Button onPress={this.loginXHR}>登陆</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    width: 200,
    height: 200
  },
  loading: {
    width: 200,
    height: 64
  },
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
})
