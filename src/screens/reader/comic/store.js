/* eslint-disable no-inner-declarations, camelcase, no-undef, no-eval */
/*
 * @Author: czy0729
 * @Date: 2020-03-24 20:00:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-20 02:43:40
 */
import { observable, computed } from 'mobx'
import { open, safeObject, trim, getTimestamp, sleep } from '@utils'
import { info } from '@utils/ui'
import { fetchHTML, t } from '@utils/fetch'
import store from '@utils/store'
import { cheerio } from '@utils/html'
import { LIST_EMPTY, HOST_MANGA } from '@constants'
import { SITE_77MH, SITE_COMIC123 } from '@constants/site'

const namespace = 'ScreenComic'
const excludeState = {
  eps: {},
  images: {},
  searchingUrl: ''
}

export default class ScreenComic extends store {
  state = observable({
    key: '',
    origins: LIST_EMPTY,
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    t('漫画.初始化', {
      subjectId: this.subjectId
    })

    const { cn, jp } = this.params
    const state = (await this.getStorage(undefined, this.namespace)) || {}
    this.setState({
      ...state,
      key: cn || jp,
      ...excludeState
    })
    if (state.origins && state.origins.list.length) {
      this.setState({
        _loaded: true
      })
      return
    }

    info('1/4')

    // 中文
    const list1 = await this.searchOrigins(cn)
    if (list1.length) {
      this.setState({
        _loaded: true
      })
      return
    }
    await sleep(2000)
    info('2/4')

    // 去掉标点
    const list2 = await this.searchOrigins(
      cn.replace(/,|\.|!|\?|\(|\)|·|、|。|！|，|（|）/g, ' ')
    )
    if (list2.length) {
      this.setState({
        _loaded: true
      })
      return
    }
    await sleep(2000)
    info('3/4')

    // 日文
    if (jp !== cn) {
      const list3 = await this.searchOrigins(jp)
      if (list3.length) {
        this.setState({
          _loaded: true
        })
        return
      }
    }
    await sleep(2000)
    info('4/4')

    // 缩短关键字
    if (cn.length > 4) {
      const list4 = await this.searchOrigins(cn.slice(0, 3))
      if (list4.length) {
        this.setState({
          _loaded: true
        })
        return
      }
    }

    this.setState({
      key: cn || jp,
      _loaded: true
    })
    info('搜索完毕')
  }

  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get namespace() {
    return `${namespace}|${this.subjectId}`
  }

  searchOrigins = async key => {
    // 新新漫画
    const HTML1 = await fetchHTML({
      url: `${SITE_77MH()}/m.php?k=${encodeURIComponent(key)}`
    })
    const $1 = cheerio(HTML1)
    const list1 =
      $1('div.clist > ul > a')
        .map((index, element) => {
          const $li = cheerio(element)
          return safeObject({
            url: $li.attr('href'),
            cover: $li.find('img').attr('src'),
            title: $li.find('p.title').text(),
            sub: $li.find('p.subtitle').text(),
            extra: $li.find('p.uptime').text(),
            headers: {
              Referer: `${SITE_77MH()}/m.php`
            },
            type: 'warning',
            tag: '新新漫画'
          })
        })
        .get() || []

    // 漫画123
    const HTML2 = await fetchHTML({
      method: 'POST',
      url: `${SITE_COMIC123()}/index.php/search.html`,
      data: {
        keyword: key
      }
    })
    const $2 = cheerio(HTML2)
    const list2 =
      $2('li.vbox')
        .map((index, element) => {
          const $li = cheerio(element)
          const $a = $li.find('a.vbox_t')
          return safeObject({
            url: `${SITE_COMIC123()}${$a.attr('href')}`,
            title: $a.attr('title'),
            cover: $a.find('mip-img').attr('src'),
            sub: $a.find('mip-img + span').text(),
            extra: $li.find('h4 + h4').text(),
            headers: {
              Referer: `${SITE_COMIC123()}/`
            },
            type: 'main',
            tag: '漫画123'
          })
        })
        .get() || []

    const list = [...list1, ...list2]
    if (list.length) {
      this.setState({
        key,
        origins: {
          list,
          _loaded: getTimestamp()
        }
      })
      this.setStorage(undefined, undefined, this.namespace)
      info('搜索完毕')
    }

    return list
  }

  searchEps = async item => {
    t('漫画.搜索章节', {
      subjectId: this.subjectId
    })

    this.setState({
      searchingUrl: item.url
    })

    let list = []
    if (item.tag === '新新漫画') {
      const HTML = await fetchHTML({
        url: item.url
      })
      const $ = cheerio(HTML)
      list = (
        $('ul.chapter > li > a')
          .map((index, element) => {
            const $li = cheerio(element)
            return safeObject({
              url: `${SITE_77MH()}/${$li.attr('href')}`,
              text: $li.text(),
              tag: item.tag
            })
          })
          .get() || []
      ).reverse()
    }

    if (item.tag === '漫画123') {
      const HTML = await fetchHTML({
        url: item.url
      })
      const $ = cheerio(HTML)
      list =
        $('ul.list_block > li > a')
          .map((index, element) => {
            const $a = cheerio(element)
            return safeObject({
              url: `${SITE_COMIC123()}${$a.attr('href')}`,
              text: $a.text(),
              tag: item.tag
            })
          })
          .get() || []
    }

    const { eps } = this.state
    this.setState({
      eps: {
        ...eps,
        [item.url]: {
          list,
          _loaded: getTimestamp()
        }
      },
      searchingUrl: ''
    })
  }

  searchImages = async (item, title, index) => {
    t('漫画.搜索图片', {
      subjectId: this.subjectId,
      index
    })

    info('获取图片地址中')

    const { url, tag } = item
    let href = ''
    if (tag === '新新漫画') {
      const HTML = await fetchHTML({
        url
      })
      const script = trim(cheerio(HTML, false)('section + script').text())

      function getImagesScript(script, title) {
        eval(script)
        return `title='${title}';images='${msg}'.split('|').map(it=>'https://picsh.77dm.top/h${img_s}/'+it)`
      }
      const urlScript = getImagesScript(script, title)
      href = `${HOST_MANGA}/index.html?script=${encodeURIComponent(urlScript)}`
    }

    if (tag === '漫画123') {
      const HTML = await fetchHTML({
        url
      })

      if (HTML.includes('images.dmzj.com')) {
        let mark = ''
        const images = JSON.stringify(
          JSON.parse(HTML.match(/var z_img='(.+?)';/)[1]).map(item => {
            const s = item.split('/')
            if (!mark) {
              mark = `${s[4]}/${s[5]}`
            }
            s[4] = '$'
            s[5] = '$'
            return s.join('/') // https://images.dmzj.com/z/$/$/001.jpg
          })
        )
        const urlScript = `title='${title}';images=${images}.map(it=>it.replace('$/$', '${mark}').replace('https://', '${SITE_COMIC123()}/pic-dmzj/'))`
        href = `${HOST_MANGA}/index.html?script=${encodeURIComponent(
          urlScript
        )}`
      } else {
        const images = HTML.match(/var z_img='(.+?)';/)[1]
        const urlScript = `title='${title}';images=JSON.parse('${images}').map(it=>'https://img.detatu.com/'+it)`
        href = `${HOST_MANGA}/index.html?script=${encodeURIComponent(
          urlScript
        )}`
      }
    }

    // 这个不缓存
    const { images } = this.state
    this.setState({
      images: {
        ...images,
        [url]: href
      }
    })
    return href
  }

  searchThenOpen = async (item, title, index) => {
    try {
      const href = await this.searchImages(item, title, index)
      open(href)
    } catch (error) {
      info('图片地址分析出错')
    }
  }

  onChange = key => {
    this.setState({
      key
    })
  }

  onSearch = () => {
    t('漫画.搜索', {
      subjectId: this.subjectId
    })

    const { key } = this.state
    this.searchOrigins(key)
  }
}
