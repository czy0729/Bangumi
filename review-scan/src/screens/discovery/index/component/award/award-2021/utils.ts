/*
 * @Author: czy0729
 * @Date: 2023-12-11 04:01:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:02:25
 */
const jquery = 'https://unpkg.com/jquery@3.6.0/dist/jquery.min.js'

export function getHtml(width: number, height: number) {
  return `
  <!DOCTYPE html>
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
        width:${width}px;
        height:${height}px
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
          width:${width}px;
          height:${height}px;
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
}
