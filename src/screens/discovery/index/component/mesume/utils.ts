/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:15:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 00:50:29
 */
import { _, systemStore } from '@stores'
import { HOST_DOGE, URL_PKG_JQUERY } from '@constants'

import type { SettingLive2DModel } from '@types'

const MODEL_CONFIG = {
  musume_classic: {
    path: 'live-2d/bangumi_musume_2d.model3.json',
    scaleAdjust: -0.06
  },
  musume_riff: {
    path: 'live-2d-2026/bangumi_musume_2026_parts.model3.json',
    scaleAdjust: 0
  },
  black_riff: {
    path: 'live-2d-black_2026/bangumi_black_musume_2026_parts.model3.json',
    scaleAdjust: 0
  }
} as const

const HIT_ACTIONS: Record<
  string,
  Record<
    string,
    {
      motion: string
      voice?: number[]
    }
  >
> = {
  default: {
    Body: { motion: 'Tap@Body' },
    Hair: { motion: 'Tap' },
    Face: { motion: 'Flick@Body' },
    Foot: { motion: 'Foot' }
  },
  musume_classic: {
    Body: { motion: 'Tap@Body', voice: [41, 40] },
    Hair: { motion: 'Tap', voice: [39, 53, 29, 30, 31] },
    Face: {
      motion: 'Flick@Body',
      voice: [40, 43, 44, 45, 46, 48, 49, 50, 51, 52, 59]
    }
  }
} as const

export function getHtml(scale: number = 1, width: number, height: number) {
  const { live2DModel } = systemStore.setting
  const config = MODEL_CONFIG[live2DModel as keyof typeof MODEL_CONFIG]
  const model =
    config?.path ?? _.select(MODEL_CONFIG.musume_riff.path, MODEL_CONFIG.black_riff.path)
  const finalScale = scale + (config?.scaleAdjust ?? 0)

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live2D</title>
    <style>
      *{padding:0;margin:0;}
      html,body{width:100%;height:100%;}
      #ukagaka_shell{position:fixed;bottom:0;right:0;z-index:90;}
      #ukagaka_shell div.ui_10{width:90px;height:170px;padding:0 10px;}
      #ukagaka_shell .ukagaka_body{width:100%;height:100%;position:absolute;top:0;left:0;}
      #oml-stage{position:fixed;bottom:0;right:0!important;opacity:0;z-index:80;}
      #oml-canvas{position:relative;z-index:81;width:100%;height:100%;}
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
    <script src="${URL_PKG_JQUERY}"></script>
    <script>
      $(document).ready(() => {
        var chiiLib={
          ukagaka:{
            playVoice:function(list){
              var id=list[Math.floor(Math.random()*list.length)]
              var html='<audio><source src="${HOST_DOGE}/live-2d/wave/wave'+id+'.wav" type="audio/wav"></audio>'
              $('#ukagaka_voice').html(html)
              var voice=document.querySelector('#ukagaka_voice audio')
              voice.volume=0.2
              voice.play()
            }
          }
        }

        $.cachedScript=function(url,options){
          options=$.extend(options||{},{dataType:'script',cache:true,url})
          return $.ajax(options)
        }

        $.cachedScript('https://bgm.tv/js/oml-cubism4.min.js?v3').done(()=>{

        OML2D.loadOhMyLive2D({
          sayHello:false,
          tips:false,
          transitionTime:500,
          rootElement:'#ukagaka_shell',
          callback:{
            ready(model){
              window.modelInstance=model

              $('#ukagaka_shell .ukagaka_body').css({
                'animation-name':'oml-stage-slide-out',
                'animation-duration':'500ms',
                animationFillMode:'forwards'
              })

              window.ReactNativeWebView?.postMessage('loaded')
            },
            hit(hitAreas,model){
              ${getHitScript(live2DModel)}
            }
          },
          source:'${HOST_DOGE}',
          models:{
            path: '${model}',
            scale:${finalScale},
            stageStyle:{width:${width},height:${height}}
          }})
        })
      })
    </script>
  </body>
  </html>`
}

function getHitScript(value: SettingLive2DModel) {
  const { live2DVoice } = systemStore.setting
  const config = HIT_ACTIONS[value as keyof typeof HIT_ACTIONS] ?? HIT_ACTIONS.default
  const areas = Object.entries(config)

  return areas
    .map(([area, data], index) => {
      const cond = index === 0 ? 'if' : 'else if'
      const voice =
        live2DVoice && data.voice ? `chiiLib.ukagaka.playVoice([${data.voice.join(',')}])` : ''

      return `
        ${cond}(hitAreas.includes('${area}')){
          model.motion('${data.motion}')
          ${voice}
        }`
    })
    .join('')
}
