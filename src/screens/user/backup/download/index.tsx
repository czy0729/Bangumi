/*
 * @Author: czy0729
 * @Date: 2022-12-06 06:14:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 15:03:02
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Download(props, { $ }) {
  if (!$.csv) return null

  return (
    <View
      style={{
        width: _.window.width,
        height: _.window.height
      }}
    >
      <WebView
        style={{
          width: _.window.width,
          height: _.window.height
        }}
        source={{
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <title>下载</title>
              <style>
                * {
                  padding: 0;
                  margin: 0;
                }
                body {
                  background: #000;
                }
              </style>
            </head>
            <body>
              <script>
                window.addEventListener('DOMContentLoaded', function () {
                  let link = document.createElement('a')
                  link.innerHTML = '下载'
                  link.style = 'color: red'

                  let exportContent = '\uFEFF'
                  let csvString = ''

                  let blob = new Blob([exportContent + csvString], {
                    type: 'text/plain;charset=utrf-8'
                  })
                  link.id = 'download-csv'
                  link.setAttribute('href', URL.createObjectURL(blob))
                  link.setAttribute('download', '123123.csv')
                  document.body.appendChild(link)
                })
              </script>
            </body>
          </html>
          `
        }}
        androidHardwareAccelerationDisabled
        androidLayerType='software'
      />
    </View>
  )
}

export default obc(Download)
