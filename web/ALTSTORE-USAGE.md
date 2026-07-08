# AltStore 直接添加源教程

前置条件：在手机上安装好了 AltStore，并且已经在电脑上安装了 AltServer。（可以参考AltStore [官方教程](https://faq.altstore.io/altstore-classic/how-to-install-altstore-macos)）

1. 底部导航栏选择"Source"，然后点击右上角的"+"按钮
2. 复制以下源地址到弹出的输入框中：
   - `https://raw.githubusercontent.com/czy0729/Bangumi/refs/heads/master/alt_store.json`

3. （注意：这一步需要手机连接到电脑，并且 AltServer 正在运行，确保 AltServer 已经信任了你的设备。同时手机需要能够访问 GitHub)
   在添加源成功后，点击源名称进入源详情页，选择Bangumi，然后点击"Install"按钮即可。

添加成功效果可以参考如下图片：

<img width="480" height="1039" alt="image" src="https://github.com/user-attachments/assets/b5ce3810-9979-4491-ae53-ab82a2dc2804" />

## 可能遇到的问题

- `ConnectionTimedOut`: 连接超时，可能是网络问题，建议检查网络连接，或者尝试使用 VPN，确保手机能够访问 GitHub。

- `Build Version Mismatch`: 版本号不匹配，可能是 json 文件中描述的版本号（根据git tag生成）与IPA实际构建版本号
  （根据app.json生成）不一致，可以在 GitHub issue 反馈。
