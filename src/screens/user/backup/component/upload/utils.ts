/*
 * @Author: czy0729
 * @Date: 2022-12-16 17:36:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-20 23:02:57
 */
import { _ } from '@stores'

export const TYPE_IMPORT = 'CSV_IMPORT'

export function injectedHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>上传CSV</title>
      <style>
        * {
          padding: 0;
          margin: 0;
        }
        body {
          background-color: ${_.isDark ? _.colorDarkModeLevel1 : '#fff'};
        }
        #upload_wrap {
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div id="upload_wrap">
        <input id="upload_input" type="file" accept=".csv" onchange="readCSVFile(this)" />
      </div>
      <script>
        function readCSVFile(obj) {
          var reader = new FileReader()
          reader.readAsText(obj.files[0])
          reader.onload = function () {
            postMessage('${TYPE_IMPORT}', this.result);
          }
        }

        function postMessage(type, data) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }))
        }
      </script>
    </body>
  </html>`
}
