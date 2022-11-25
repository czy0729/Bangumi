/*
 * @Author: czy0729
 * @Date: 2021-01-16 00:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:33:19
 */
import { observable, computed } from 'mobx'
import { open, copy, info } from '@utils'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { HOST_MANGA, CDN_HD } from '@constants'
import { systemStore } from '@stores'
import { Params } from './types'

export default class ScreenHD extends store {
  params: Params

  state = observable({
    data: [],
    _loaded: false
  })

  init = async () => {
    try {
      const HTML = await fetchHTML({
        url: CDN_HD(this.subjectId)
      })
      this.setState({
        data: JSON.parse(HTML)
      })
    } catch (error) {
      info('数据解析出错')
    }
  }

  @computed get title() {
    const { cn } = this.params
    return cn || ''
  }

  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  /**
   * {
   *   paeg: 170,
   *   vol: 1
   * }
   */
  jump = (item: { vol: any; page: number }) => {
    t('HD.查看', {
      val: `${this.subjectId}|${item.vol}`
    })

    const title = typeof item.vol === 'number' ? `vol.${item.vol}` : item.vol
    const urlScript = `title='${title}';images=new Array(${
      item.page - 1
    }).fill('').map((it,i)=>'https://cdn.jsdelivr.net/gh/czybot/m@master/out/${
      this.subjectId
    }/${item.vol}/'+(i+1)+'.jpg')`
    const href = `${HOST_MANGA}/index.html?script=${encodeURIComponent(urlScript)}`

    const { openInfo } = systemStore.setting
    if (openInfo) copy(href, '已复制地址')
    setTimeout(
      () => {
        open(href)
      },
      openInfo ? 1600 : 0
    )
  }
}
