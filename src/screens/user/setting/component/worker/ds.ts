/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-31 09:52:15
 */
import { rc } from '@utils/dev'
import { API_HOST_BACKUP } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Worker')

export const TEXTS = {
  worker: {
    hd: '代理'
  },
  workerProxy: {
    title: '主站域名',
    information: '用于替换 Host'
  },
  workerApiProxy: {
    title: 'API 域名',
    information: `用于替换 API Host，推荐填入 ${API_HOST_BACKUP}`
  },
  imageProxy: {
    title: '图片域名',
    information: '用于替换图片 Host'
  },
  workerSecret: {
    title: '代理密钥',
    information: `通常不填，若有值会在请求头携带 x-proxy-key=密钥\n可用于请求鉴权，防止盗用`
  },
  workerLainSecret: {
    title: '图片代理密钥',
    information:
      '通常不填，若有值会在图片地址后携带参数\nv={hmacSHA256(图片去参数地址, 密钥).slice(0, 4)}\n可用于图片鉴权，防止盗用'
  },
  workerProxyDirect: {
    hd: '直连模式',
    information: `如果目标是 Nginx 等直接对域名直接覆写的请开启，开启后仅替换 Host。
    \n推荐直连使用代理，因作者没提前打招呼故不作提及，请自行到超展开社区里面找，目前已经有不少班友提供有效服务。
    \n如果目标是 cf worker / deno deploy 请关闭。如果你动手能力强想自建 worker，可以到 github 找到此项目源码，对应目录有各种 worker 代码可以直接复制部署。解析：在请求层层转发后，很多的例如 cookie、授权后的 code、重定向地址是会丢失的，需要自行转为例如 x-cookie、x-redirect-url 之类的头传透后返回给客户端提取使用。`
  }
} as const
