# packages 多环境管理

本项目通过 `yarn env [ios | android | ipa | web]` 在多个开发环境之间切换，脚本见 `packages/env.js`。提交代码前请切回 ios 环境。

## 目录结构

```
packages/
├── env.js          # 环境切换脚本
├── ios/            # iOS 环境（提交基准）
├── android/        # Android 环境
├── ipa/            # IPA 构建环境（见 ipa/README.MD）
├── web/            # Web 环境
└── README.md       # 本文件
```

每个环境目录独立维护以下内容：

| 内容 | 说明 |
|---|---|
| `package.json` | 该环境专属依赖版本 |
| `node_modules/` | 该环境安装的完整依赖 |
| `patches/` | 该环境适用的 patch-package 补丁 |

## 切换机制

`yarn env <目标环境>` 执行三件事：

1. **备份当前环境**：将根目录的 `package.json`、`node_modules`、`patches/` 备份到 `packages/{当前环境}/`
2. **恢复目标环境**：将 `packages/{目标环境}/` 的 `package.json`、`node_modules`、`patches/` 恢复到根目录
3. **更新平台配置**：同步 `babel.config.js` 与 `app.json`

因此根目录 `patches/` 始终是当前环境的补丁镜像，随环境切换自动同步，补丁只需在各环境目录维护一处。

## 补丁管理约定

- 补丁文件命名遵循 patch-package 规范：`{包名}+{版本}.patch`
- 各环境只保留**该环境下实际安装且版本匹配**的补丁，避免跨环境版本不匹配导致应用失败
- 修改补丁时改对应环境的 `packages/{环境}/patches/`，切换环境后自动带到根目录
- 使用 `npx patch-package <包名>` 生成补丁时会写入根目录 `patches/`，随后切换环境会将其归档到当前环境目录

## 注意事项

- 根目录 `patches/` 为运行时镜像，不要直接作为唯一修改源
- 非 mac 环境切换前请关闭编辑器，避免 `node_modules` 被占用
- 提交 git 前务必切回 ios 环境