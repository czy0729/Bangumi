/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 09:38:07
 */
import { rc } from '@utils/dev'
import { API_HOST_BACKUP } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Worker')

export const TEXTS = {
  worker: {
    hd: '代理'
  },
  workerProxyDisabled: {
    hd: '全局禁用代理',
    information: '开启后即使下方设置有值，客户端也不会走代理模式，所有请求直连默认服务器'
  },
  workerProxy: {
    title: '主站域名',
    information: '用于替换 Host (登录和绝大部分功能都需要用到)'
  },
  workerApiProxy: {
    title: 'API 域名',
    information: `用于替换 API Host (接口授权和管理条目收藏进度等)，推荐填入 ${API_HOST_BACKUP}`
  },
  imageProxy: {
    title: '图片域名',
    information: '用于替换图片 Host (显示条目封面、头像等)'
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
    \n推荐直连使用代理，请自行到超展开社区里面找，目前已经有不少班友提供有效服务。
    \n如果目标是 cf worker / deno deploy 请关闭，并请到 github 项目相应目录里复制作者编写的 worker 文件部署。
    \n解析：在请求层层转发后，例如 cookie、授权后的 code、重定向地址等会丢失。如果是正常访问普通页面可能不需要，但是登录等复杂操作就必须要自行在 worker 里捕获并转为例如 x-redirect-url、location、set-cookie 之类的头，传透返回给客户端提取使用。`
  }
} as const
