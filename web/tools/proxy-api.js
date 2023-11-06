/*
 * @Author: czy0729
 * @Date: 2023-04-10 16:53:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-06 18:54:06
 */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

/** 本地开发环境页面路径 */
const ORIGIN = 'http://192.168.31.87:6006'

/** 本地监听端口 */
const PORT = 3000

const app = express()

app.use(
  cors({
    origin: ORIGIN
  })
)

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://bgm.tv',
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
      if (req.path.startsWith('/subject_search/')) {
        proxyReq.setHeader('Cookie', 'chii_searchDateLine=0')
      }
    }
  })
)

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
