/*
 * @Author: czy0729
 * @Date: 2021-01-16 00:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 15:27:28
 */
import { observable, computed } from 'mobx'
import { open, copy } from '@utils'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST_MANGA } from '@constants'
import { CDN_HD } from '@constants/cdn'

export default class ScreenHD extends store {
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
   * @param {*} item
   *
   * {
   *   paeg: 170,
   *   vol: 1
   * }
   */
  jump = item => {
    t('HD.查看', {
      val: `${this.subjectId}|${item.vol}`
    })

    const title = typeof item.vol === 'number' ? `vol.${item.vol}` : item.vol
    const urlScript = `title='${title}';images=new Array(${
      item.page - 1
    }).fill('').map((it,i)=>'https://cdn.jsdelivr.net/gh/czybot/m@master/out/${
      this.subjectId
    }/${item.vol}/'+(i+1)+'.jpg')`
    const href = `${HOST_MANGA}/index.html?script=${encodeURIComponent(
      urlScript
    )}`
    copy(href)
    info('已复制地址')

    setTimeout(() => {
      open(href)
    }, 1600)
  }
}
