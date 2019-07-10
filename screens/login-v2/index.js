/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-10 23:58:34
 */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Constants } from 'expo'
import { Input, Button } from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { userStore } from '@stores'
import { urlStringify, getTimestamp } from '@utils'
import { HOST } from '@constants'
import _ from '@styles'

// config
const email = '402731062@qq.com'
const password = '84783019'
const clientId = 'bgm8885c4d524cd61fc'
const clientSecret = '1da52e7834bbb73cca90302f9ddbc8dd'

export default class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    state: getTimestamp(),
    captcha: '',
    base64: ''
  }

  userAgent = ''
  formhash = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }

  async componentDidMount() {
    this.userAgent = await Constants.getWebViewUserAgentAsync()

    // await this.logout()
    await this.getFormHash()
    await this.getCaptcha()
  }

  logout = () =>
    new Promise(resolve => {
      const request = new XMLHttpRequest()

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          resolve()
        }
      }
      request.withCredentials = false
      request.open('GET', `${HOST}/logout/7dd16c5e`, true)
      request.setRequestHeader('User-Agent', this.userAgent)
      request.send()
    })

  getFormHash = () =>
    new Promise(resolve => {
      const request = new XMLHttpRequest()
      const that = this

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
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
          const match = this._response.match(
            /<input type="hidden" name="formhash" value="(.+?)">/
          )
          if (match) {
            that.formhash = match[1]
          }

          resolve()
        }
      }
      request.withCredentials = false
      request.open('GET', `${HOST}/login`, true)
      request.setRequestHeader('User-Agent', this.userAgent)
      request.send()
    })

  getCaptcha = () =>
    new Promise(resolve => {
      const { state } = this.state
      const request = new XMLHttpRequest()
      const that = this

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          that.setState({
            base64: `data:image/gif;base64,${this._response}`
          })
          resolve()
        }
      }
      request.withCredentials = false
      request.responseType = 'arraybuffer'
      request.open('GET', `${HOST}/signup/captcha?state=${state}`, true)
      request.setRequestHeader('Cookie', `; chii_sid=${this.cookie.chiiSid};`)
      request.setRequestHeader('User-Agent', this.userAgent)
      request.send()
    })

  login = () =>
    new Promise(resolve => {
      const { captcha } = this.state
      const request = new XMLHttpRequest()
      const that = this

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseHeaders['Set-Cookie']) {
            const match = this.responseHeaders['Set-Cookie'].match(
              /chii_auth=(.+?);/
            )
            if (match) {
              that.cookie.chiiAuth = match[1]
            }
          }

          this.oauth()
          resolve()
        }
      }
      request.withCredentials = false
      request.open('POST', `${HOST}/FollowTheRabbit`, true)
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
      request.setRequestHeader('Cookie', `; chii_sid=${this.cookie.chiiSid};`)
      request.setRequestHeader('User-Agent', this.userAgent)
      request.send(
        urlStringify({
          formhash: this.formhash,
          referer: '',
          dreferer: '',
          email,
          password,
          captcha_challenge_field: captcha,
          loginsubmit: '登录'
        })
      )
    })

  oauth = () =>
    new Promise(resolve => {
      const request = new XMLHttpRequest()
      const that = this

      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          log(this)
          resolve()
        }
      }
      request.withCredentials = false
      request.open(
        'GET',
        `${HOST}/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=code`,
        true
      )
      request.setRequestHeader(
        'Cookie',
        `; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`
      )
      request.setRequestHeader('User-Agent', this.userAgent)
      request.send(null)
    })

  onChange = evt => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      captcha: text
    })
  }

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
        <Button onPress={this.login}>登陆</Button>
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
