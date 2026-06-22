/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 17:54:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Worker')

export const TEXTS = {
  worker: {
    hd: '代理'
  },
  proxyMode: {
    hd: '连接模式',
    information: '选择访问 Bangumi 的网络方式（切换后可能需要冷启动才能正常）'
  },
  echProxy: {
    hd: 'ECH 模式 (Android)',
    information:
      '自动接管 Bangumi 域名请求，无需配置。\n通过加密 SNI 和 DNS 保护你的隐私，防止连接被识别和干扰。\n但此模式开启后接管网址的 WebView 依然会受限。'
  },
  echStatus: {
    running: '运行中',
    stopped: '未运行'
  },
  workerProxyDisabled: {
    hd: '直连',
    information: '所有请求直连默认服务器'
  },
  workerProxy: {
    title: '主站域名',
    information: '用于替换 Host (登录和绝大部分功能都需要用到，请注意不应该以斜杠结尾)'
  },
  workerApiProxy: {
    title: 'API 域名',
    information:
      '用于替换 API Host (接口授权和管理条目收藏进度等，请注意不应该以斜杠结尾)，当前服务正常可以不填'
  },
  imageProxy: {
    title: '图片域名',
    information: '用于替换图片 Host (显示条目封面、头像等，请注意不应该以斜杠结尾)'
  },
  workerSecret: {
    title: '密钥',
    information: `通常不填，若有值会在请求头携带 x-proxy-key=密钥\n可用于请求鉴权，防止盗用`
  },
  workerLainSecret: {
    title: '图片密钥',
    information:
      '通常不填，若有值会在图片地址后携带参数\nv={hmacSHA256(图片去参数地址, 密钥).slice(0, 4)}\n可用于图片鉴权，防止盗用'
  },
  workerProxyDirect: {
    hd: '使用了自建 Worker？',
    information: `关闭：由节点自行处理转发（如 Nginx 直接覆写域名）
    \n开启：由 Worker 帮你处理 cookie、重定向等转发细节。
    \n推荐保持关闭，直接使用社区提供的服务即可（超展开社区有不少班友提供服务）。
    \n⚠️ 注意：使用第三方服务意味着你的请求会经过第三方服务器。如需自建，请到 GitHub 项目目录复制作者提供的 Worker 文件部署到 Cloudflare Worker / Deno Deploy。`
  }
} as const
