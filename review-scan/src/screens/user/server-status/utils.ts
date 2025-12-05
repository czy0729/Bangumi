/*
 * @Author: czy0729
 * @Date: 2022-08-20 10:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:19:51
 */
import { subjectStore } from '@stores'
import {
  API_CALENDAR,
  CDN_DISCOVERY_HOME,
  CDN_ONAIR,
  GITHUB_RELEASE_REPOS,
  HOST_AC,
  HOST_AC_API,
  HOST_IMAGE_UPLOAD,
  HOST_NETABA,
  SITE_AGEFANS,
  URL_OAUTH
} from '@constants'
import { getOriginConfig } from '../origin-setting/utils'

/** 获取需要检测的站点 */
export function getSitesList() {
  const OriginUrls = []

  try {
    const origins = getOriginConfig(subjectStore.origin)
    Object.keys(origins).forEach(type => {
      origins[type].forEach(item => {
        if (item.active === 1) {
          OriginUrls.push({
            title: item.url,
            desc: `${item.name} (源头)`,
            url: item.url,
            msg: [],
            loading: false
          })
        }
      })
    })
  } catch (error) {}

  return [
    ...[
      {
        title: 'https://bgm.tv',
        desc: '主站 (必要)',
        url: 'https://bgm.tv/about/copyright',
        msg: [],
        loading: false
      },
      {
        title: 'https://bangumi.tv',
        desc: '登录验证码 (登录必要)',
        url: 'https://bangumi.tv/about/copyright',
        msg: [],
        loading: false
      },
      {
        title: URL_OAUTH,
        desc: '授权登录服务 (登录必要)',
        url: URL_OAUTH,
        msg: [],
        loading: false
      },
      {
        title: 'https://api.bgm.tv',
        desc: '主站 Api (必要)',
        url: API_CALENDAR(),
        msg: [],
        loading: false
      },
      {
        title: 'https://gitee.com',
        desc: 'CDN 版本检测',
        url: 'https://gitee.com/a402731062/bangumi/raw/master/data.json',
        msg: [],
        loading: false
      },
      {
        title: 'https://cdn.jsdelivr.net',
        desc: 'CDN 资源域',
        url: CDN_DISCOVERY_HOME(),
        msg: [],
        loading: false
      },
      {
        title: 'https://tinygrail.com',
        desc: '小圣杯 Api',
        url: 'https://tinygrail.com',
        msg: [],
        loading: false
      },
      {
        title: GITHUB_RELEASE_REPOS,
        desc: 'App 版本检测',
        url: GITHUB_RELEASE_REPOS,
        msg: [],
        loading: false
      },
      {
        title: 'https://bangumi-mosaic-tile.aho.im',
        desc: '进度瓷砖 Api',
        url: 'https://bangumi-mosaic-tile.aho.im',
        msg: [],
        loading: false
      },
      {
        title: '/gh/ekibun/bangumi_onair',
        desc: '每日放送',
        url: CDN_ONAIR(),
        msg: [],
        loading: false
      },
      {
        title: `${SITE_AGEFANS()}/update`,
        desc: 'Agefans',
        url: `${SITE_AGEFANS()}/update`,
        msg: [],
        loading: false
      },
      {
        title: `${HOST_AC_API}/pgc/web/season/section?season_id=1`,
        desc: 'bilibili 番剧预览图',
        url: `${HOST_AC_API}/pgc/web/season/section?season_id=1`,
        headers: {
          Referer: `${HOST_AC}/`
        },
        msg: [],
        loading: false
      },
      {
        title: 'https://list.youku.com/show/module?id=1&tab=point&callback=jQuery',
        desc: 'youku 番剧预览图',
        url: 'https://list.youku.com/show/module?id=1&tab=point&callback=jQuery',
        headers: {
          Referer: 'https://list.youku.com/'
        },
        msg: [],
        loading: false
      },
      {
        title: HOST_NETABA,
        desc: 'netaba.re',
        url: HOST_NETABA,
        msg: [],
        loading: false
      },
      {
        title: HOST_IMAGE_UPLOAD,
        desc: '免费图床',
        url: HOST_IMAGE_UPLOAD,
        msg: [],
        loading: false
      }
    ],
    ...OriginUrls
  ]
}
