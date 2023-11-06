/*
 * @Author: czy0729
 * @Date: 2023-11-06 07:09:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-06 18:53:53
 */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

/** 本地开发环境页面路径 */
const ORIGIN = 'http://192.168.31.87:6006'

/** 反代地址 */
const TARGET = 'http://192.168.31.105:5081'

/** 本地监听端口 */
const PORT = 3001

const app = express()

app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PROPFIND'],
    allowedHeaders: [
      'Authorization',
      'Cache-Control',
      'Content-Range',
      'Content-Type',
      'Depth',
      'Destination',
      'If-Modified-Since',
      'Overwrite',
      'Range',
      'Timeout',
      'Translate',
      'User-Agent',
      'X-File-Name',
      'X-File-Size',
      'X-Requested-With'
    ],
    exposedHeaders: ['DAV', 'Content-Length', 'Allow']
  })
)

app.use(
  '/',
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true
    // onProxyReq(proxyReq, req) {
    //   console.log(req.path)
    // }
  })
)

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
