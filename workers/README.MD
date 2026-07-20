# Workers

> 🤖 本文档由 AI 生成，实际情况请自行判断。

Bangumi 的反向代理 Worker，推荐部署到 **Deno Deploy**（国内可访问）。

> ❗ Cloudflare Workers 自带的 `*.workers.dev` 域名**国内无法访问**，如果你有备案的自定义域名可以用 CF，否则请用 Deno。

---

## 文件说明

| 文件            | 用途                                             |
| --------------- | ------------------------------------------------ |
| `deno/index.ts` | **通用代理** — 转发 API、网页等请求，解决跨域    |
| `deno/lain.ts`  | **图片代理** — 缓存 `lain.bgm.tv` 图片，节省流量 |
| `cf/index.js`   | Cloudflare 版通用代理（需自定义域名）            |
| `cf/lain.js`    | Cloudflare 版图片代理（需自定义域名）            |

---

## 部署到 Deno Deploy（推荐）

全程在网页操作，**不需要安装任何东西**。

### 部署通用代理

1. 打开 [Deno Deploy](https://console.deno.com)，用 GitHub 登录
2. 点击 **New Project** → **Playground**
3. 删除默认代码，复制粘贴 [`deno/index.ts`](deno/index.ts) 的全部内容
4. 顶部 Project Name 填一个名字（如 `bgm-proxy`），点击 **Deploy**
5. 部署完成后得到一个 `https://bgm-proxy.deno.dev` 的地址

### 部署图片代理（可选）

重复以上步骤，粘贴 [`deno/lain.ts`](deno/lain.ts) 的内容，取另一个名字（如 `bgm-lain`）。

---

## 部署到 Cloudflare Workers（需自定义域名）

如果你有备案域名，也可以用 Cloudflare：

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. 点击 **Create Worker**
3. 删除默认代码，复制粘贴 [`cf/index.js`](cf/index.js)（通用代理）或 [`cf/lain.js`](cf/lain.js)（图片代理）
4. 点击 **Deploy**
5. 在 Worker 详情页 → **Triggers** → **Custom Domains** 绑定你的域名

---

## 在 Bangumi 中配置

设置 → 网络 → 代理，连接模式选**「镜像 / 反代」**。

### 填写地址

App 中有 **3 个输入框**，对应不同的用途：

| 输入框标题 | 默认上游      | 填写你的 Worker 地址         |
| ---------- | ------------- | ---------------------------- |
| 主站域名   | `bgm.tv`      | `https://bgm-proxy.deno.dev` |
| API 域名   | `api.bgm.tv`  | 不填则和主站共用同一个       |
| 图片域名   | `lain.bgm.tv` | `https://bgm-lain.deno.dev`  |

- **主站域名**必填，登录、浏览等绝大部分功能都依赖它
- **API 域名**通常可以不填，会跟随主站域名
- **图片域名**不填也不影响使用，只是图片不经过代理

> 填写后立即生效，如遇到问题请重启 App 或重新登录。

### 直接转发

如果用的是本项目提供的 Worker 脚本，**保持「使用了自建 Worker？」关闭即可**。这个开关是给 Nginx 等其他方案用的。

---

## 加个密码（可选）

部署后任何人都能使用你的 Worker。如果需要加密码，在 Deno Dashboard / Cloudflare Dashboard 的 **Environment Variables** 中添加：

| 变量名   | workerSecret             | workerLainSecret       |
| -------- | ------------------------ | ---------------------- |
| 对应文件 | `index.ts` / `index.js`  | `lain.ts` / `lain.js`  |
| 添加位置 | 环境变量 `WORKER_SECRET` | 环境变量 `LAIN_SECRET` |
| App 填写 | 设置 → 密钥              | 设置 → 图片密钥        |

不设置则所有人都能用，按需决定。

### 调试

App 中设置页面底部有**日志控制台**，可以实时查看请求走了哪个代理、是否成功，方便排错。
