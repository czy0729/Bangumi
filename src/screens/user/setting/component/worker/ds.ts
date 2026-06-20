/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-20 06:55:40
 */
import { rc } from '@utils/dev'
import { API_HOST_BACKUP } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Worker')

export const TEXTS = {
  worker: {
    hd: '代理'
  },
  proxyMode: {
    hd: '代理模式',
    information: '选择访问 Bangumi 的网络方式'
  },
  echProxy: {
    hd: 'ECH 代理 (Android)',
    information:
      '自动接管 Bangumi 域名请求，无需配置。\n通过 ECH 加密 SNI 绕过封锁，同时启用 DoH 防止 DNS 污染。'
  },
  echStatus: {
    running: '运行中',
    stopped: '未运行'
  },
  workerProxyDisabled: {
    hd: '禁用代理',
    information: '所有请求直连默认服务器'
  },
  workerProxy: {
    title: '主站域名',
    information: '用于替换 Host (登录和绝大部分功能都需要用到，请注意不应该以斜杠结尾)'
  },
  workerApiProxy: {
    title: 'API 域名',
    information: `用于替换 API Host (接口授权和管理条目收藏进度等，请注意不应该以斜杠结尾)，推荐填入 ${API_HOST_BACKUP}`
  },
  imageProxy: {
    title: '图片域名',
    information: '用于替换图片 Host (显示条目封面、头像等，请注意不应该以斜杠结尾)'
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
    hd: '使用了自建 Worker？',
    information: `关闭：由镜像 / 反代自行处理转发（如 Nginx 直接覆写域名）
    \n开启：由 Worker 帮你处理 cookie、重定向等转发细节。
    \n推荐保持关闭，直接使用社区提供的镜像站即可（超展开社区有不少班友提供服务）。
    \n⚠️ 注意：使用第三方镜像 / 反代服务意味着你的请求会经过第三方服务器。如需自建，请到 GitHub 项目目录复制作者提供的 Worker 文件部署到 cf worker / deno deploy。`,
    informationDirect: `解析：在请求层层转发后，例如 cookie、授权后的 code、重定向地址等会丢失。如果是正常访问普通页面可能不需要，但是登录等复杂操作就必须要自行在 worker 里捕获并转为例如 x-redirect-url、location、set-cookie 之类的头，传透返回给客户端提取使用。`
  }
} as const
