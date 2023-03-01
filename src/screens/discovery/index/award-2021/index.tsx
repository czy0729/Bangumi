/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2022-02-14 06:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 01:18:38
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Image, Touchable } from '@components'
import { systemStore } from '@stores'
import { useIsFocused, useObserver } from '@utils/hooks'
import { c } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, TEXT_ONLY } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const jquery = 'https://unpkg.com/jquery@3.6.0/dist/jquery.min.js'

function Award2021(props, { $, navigation }: Ctx) {
  const show = useIsFocused()

  return useObserver(() => {
    const styles = memoStyles()
    const { coverRadius } = systemStore.setting
    const { showBlockTrain } = $.state
    return (
      <View
        style={[
          styles.container,
          {
            borderRadius: coverRadius
          }
        ]}
      >
        <Touchable
          style={styles.item2021}
          animate
          onPress={() => {
            t('发现.跳转', {
              to: 'Award',
              year: 2021
            })

            navigation.push('Award', {
              uri: `${HOST}/award/2021`
            })
          }}
        >
          {/* {!TEXT_ONLY &&
            (showBlockTrain ? (
              show && (
                <WebView
                  style={styles.body}
                  source={{
                    html: `<!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width,initial-scale=1" />
                        <title>Bangumi Award 2021</title>
                        <style>
                          * {
                            padding: 0;
                            margin: 0;
                          }
                          ::-webkit-scrollbar {
                            display: none;
                          }
                          body {
                            overflow: hidden;
                            background: #000;
                          }
                          a {
                            font-size: 13px;
                            text-decoration: none;
                          }
                          .blockrain-score-holder {
                            display: none !important;
                          }
                        </style>
                      </head>
                      <body>
                        <div
                          style="
                            position:relative;
                            width:${styles.body.width}px;
                            height:${styles.body.height}px
                          "
                        >
                          <div
                            class="SidePanelMini clearit"
                            style="
                              overflow:hidden;
                              position:relative;
                              box-sizing:border-box;
                              border:none;
                              padding:0;
                              margin:0 0 10px 0;
                              border:none;
                              background-color:#c4cfa1;
                              box-shadow:0 10px 20px rgba(0,0,0,.2);
                              width:${styles.body.width}px;
                              height:${styles.body.height}px;
                              line-height:100%
                            "
                          >
                            <div
                              style="
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                z-index: 1;
                                color: #fff;
                                background-color: #c4cfa1;
                              "
                            >
                              <div>
                                <div
                                  class="screen_game"
                                  style="
                                    position: absolute;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    overflow: hidden;
                                  "
                                ></div>
                                <div
                                  style="
                                    font-family: monospace, Pixelmix, 'HanHei SC', 'PingFang SC',
                                      'Helvetica Neue', Helvetica, STHeitiSC-Light, Arial, sans-serif;
                                    position: absolute;
                                    z-index: 1;
                                    width: 100%;
                                    height: 100%;
                                    text-align: center;
                                    top: 35%;
                                    font-size: 18px;
                                    color: #3e4730;
                                    text-shadow: 1px 1px #c4cfa1;
                                  "
                                >
                                  2021 YEAR IN REVIEW
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <script src="${jquery}"></script>
                        <script src="https://bgm.tv/js/jquery_blockrain.js?r351"></script>
                        <script>
                          window.addEventListener('DOMContentLoaded', function () {
                            $('.screen_game').blockrain({
                              theme: 'gameboy',
                              blockWidth: 18,
                              showFieldOnStart: !1,
                              autoplay: !0,
                              autoplayRestart: !0,
                              controls: !1
                            })
                          })
                        </script>
                      </body>
                    </html>
                    `
                  }}
                  scrollEnabled={false}
                  androidHardwareAccelerationDisabled
                  androidLayerType='software'
                />
              )
            ) : (
              <Image
                src={require('@assets/images/static/2021.png')}
                size={styles.body.width}
                height={styles.body.height}
                placeholder={false}
                resizeMode='contain'
              />
            ))} */}
          {!TEXT_ONLY && (
            <Image
              src={require('@assets/images/static/2021.png')}
              size={styles.body.width}
              height={styles.body.height}
              placeholder={false}
              resizeMode='contain'
            />
          )}
        </Touchable>
        {/* <View style={styles.touch}>
          <Touchable onPress={$.toggleBlockTrain}>
            <View style={styles.switch}>
              <Text style={styles.switchText} size={12} align='center'>
                {showBlockTrain ? 'ON' : 'OFF'}
              </Text>
            </View>
          </Touchable>
        </View> */}
      </View>
    )
  })
}

export default c(Award2021)
