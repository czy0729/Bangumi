import { HOST_DOGE } from '@constants'

/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:15:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 11:28:34
 */
export function getHtml(live2DVoice: boolean) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        * {
          padding: 0;
          margin: 0;
        }
        #ukagaka_shell {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 90;
        }
        #ukagaka_shell div.ui_10 {
          width: 150px;
          height: 355px;
          color: #ab515d;
        }
        #ukagaka_shell .ukagaka_body {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        #oml-stage {
          position: fixed;
          bottom: 0;
          opacity: 0;
          left: auto;
          right: 0 !important;
          z-index: 80;
        }
        #oml-canvas {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 81;
        }
      </style>
    </head>
    <body>
      <div id="ukagaka_shell">
        <div class="ui_10">
          <div class="ukagaka_body shell_1">
            <div id="ukagaka_voice"></div>
          </div>
        </div>
      </div>
      <script src="https://unpkg.com/jquery@3.6.0/dist/jquery.min.js"></script>
      <script>
        $(document).ready(() => {
          var chiiLib = {
            ukagaka: {
              playVoice: function (voice_list) {
                var voice_id = voice_list[Math.floor(Math.random() * voice_list.length)]
                var voice_str =
                  '<audio><source src="${HOST_DOGE}/live-2d/wave/wave' +
                  voice_id +
                  '.wav" type="audio/wav"></audio>'
                $('#ukagaka_voice').html(voice_str)
                var voice = document.querySelector('#ukagaka_voice audio')
                voice.volume = 0.2
                voice.play()
              }
            }
          }

          $.cachedScript = function (url, options) {
            options = $.extend(options || {}, {
              dataType: "script",
              cache: true,
              url: url,
            });
            return $.ajax(options);
          };

          $.cachedScript('https://bgm.tv/js/oml-cubism4.min.js?v3').done(function () {
            var path = 'live-2d/bangumi_musume_2d.model3.json'
            OML2D.loadOhMyLive2D({
              sayHello: false,
              tips: false,
              transitionTime: 500,
              rootElement: '#ukagaka_shell',
              callback: {
                ready: function () {
                  $('#ukagaka_shell .ukagaka_body').css({
                    'animation-name': 'oml-stage-slide-out',
                    'animation-duration': '500ms',
                    animationFillMode: 'forwards'
                  })
                },
                hit: function (hitAreas, model) {
                  if (hitAreas.includes('Body')) {
                    model.motion('Tap@Body')
                    ${live2DVoice ? 'chiiLib.ukagaka.playVoice([41, 40])' : ''}
                  } else if (hitAreas.includes('Hair')) {
                    model.motion('Tap')
                    ${live2DVoice ? 'chiiLib.ukagaka.playVoice([39, 53, 29, 30, 31])' : ''}
                  } else if (hitAreas.includes('Face')) {
                    model.motion('Flick@Body')
                    ${
                      live2DVoice
                        ? 'chiiLib.ukagaka.playVoice([40, 43, 44, 45, 46, 48, 49, 50, 51, 52, 59])'
                        : ''
                    }
                  }
                }
              },
              source: '${HOST_DOGE}',
              models: {
                path: path,
                scale: 0.72,
                stageStyle: { width: '140', height: '256' }
              }
            })
          })
        })
      </script>
    </body>
  </html>`
}
