/*
 * @Author: czy0729
 * @Date: 2022-01-11 10:11:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 09:34:52
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Milestone() {
  const { $ } = useStore<Ctx>()
  if ($.topicId !== 'group/366561') return null

  const styles = memoStyles()

  // eslint-disable-next-line max-len
  const html = `<!DOCTYPE html><html lang=en><head><meta charset="UTF-8"><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><title>Bangumi Open Source</title><style>*{padding:0;margin:0}::-webkit-scrollbar{display:none}body{overflow:hidden;background:#000}</style><body><div style=position:relative;width:${styles.body.width}px;height:${styles.body.height}px><canvas id=canvas_matrix style=display:block;background-color:transparent;position:absolute;left:0;top:0;width:${styles.body.width}px;height:${styles.body.height}px width=300 height=150></canvas><canvas id=canvas_matrix_2 style=display:block;background-color:transparent;position:absolute;left:0;top:0;width:${styles.body.width}px;height:${styles.body.height}px;border-radius:15px width=300 height=150></canvas><div style="font-family:Courier New,serif;position:absolute;width:100%;height:100%;text-align:center;top:45%;font-size:20px;color:#fff;text-shadow:0 0 15px #0f0,0 0 9px #56b000,0 0 15px #006400,0 0 5px #006400">Bangumi Open Source</div></div><script>function m(t,e){return Math.floor(Math.random()*(e-t)+t)}function v(t,e){return Math.random()*(e-t)+t}function d(t,e){this.x=t,this.y=e}var t=document.getElementById("canvas_matrix"),n=t.getContext("2d"),i=document.getElementById("canvas_matrix_2"),s=i.getContext("2d"),a=t.width,h=t.height,r=["b","a","n","g","u","m","i","o","p","e","n","s","o","u","r","c","e"],e=10,u=[],o=10,c=10,f=a/o;t.width=i.width=a,t.height=i.height=h,d.prototype.t=function(t){this.value=r[m(0,r.length-1)].toUpperCase(),this.speed=v(.5,1.5),s.fillStyle="rgba(255,255,255,0.3)",s.font=c+"px san-serif",s.fillText(this.value,this.x,this.y),t.fillStyle="#0F0",t.font=c+"px san-serif",t.fillText(this.value,this.x,this.y),this.y+=this.speed,this.y>h&&(this.y=v(-100,10),this.speed=v(.5,3))};for(var x=0;f>x;x++)u.push(new d(x*o,v(-500,0)));var b=function(){n.fillStyle="rgba(0, 0, 0, 0.05)",n.fillRect(0,0,a,h),s.clearRect(0,0,a,h);for(var t=u.length;t--;){u[t].t(n);{u[t]}}requestAnimationFrame(b)};b();</script>`
  return (
    <View style={styles.container}>
      {!$.state.showHeaderTitle && (
        <WebView
          style={styles.body}
          source={{
            html
          }}
          scrollEnabled={false}
          androidHardwareAccelerationDisabled
          androidLayerType='software'
        />
      )}
    </View>
  )
}

export default ob(Milestone, COMPONENT)
