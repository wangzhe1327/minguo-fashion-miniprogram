# Windows 本机 AI 服务器部署

这台电脑已检测到 `NVIDIA GeForce RTX 4060 8GB`，可以作为小程序的本机 AI 修图服务器。当前已验证通过：

- 本机 Worker: `http://127.0.0.1:8080`
- 临时公网地址: `https://fan-spend-minutes-texts.trycloudflare.com`
- 启用模型: GFPGAN + Real-ESRGAN + OpenCV/Pillow
- 公网 `/process` 测试已返回 `opencv-pillow,gfpgan,realesrgan`

## 架构

```text
用户在小程序提交修图订单
  -> 微信云数据库 retouchOrders
  -> 管理端触发 processRetouchOrder 云函数
  -> 云函数通过 HTTPS 调用本机 AI Worker
  -> RTX 4060 本机推理修图
  -> 云函数上传成片到微信云存储
  -> 用户在小程序里查看和保存成片
```

微信云函数不能访问你电脑上的 `localhost`，所以本机服务必须通过公网 HTTPS 暴露。当前使用 Cloudflare Quick Tunnel 做测试；正式商用建议换成固定 Cloudflare Tunnel 和固定域名。

## 已安装内容

- Python 3.11
- CUDA 版 PyTorch
- FastAPI / Uvicorn
- GFPGAN / Real-ESRGAN / BasicSR / FaceXLib
- Cloudflare Tunnel
- 本地模型权重：
  - `models/GFPGANv1.3.pth`
  - `models/RealESRGAN_x4plus.pth`
  - `gfpgan/weights/detection_Resnet50_Final.pth`
  - `gfpgan/weights/parsing_parsenet.pth`

模型文件和 `.env` 都已加入 `.gitignore`，不要上传到 GitHub。

## 常用命令

进入目录：

```powershell
cd C:\vmshare\minguo-fashion-miniprogram\backend\retouch-worker
```

启动本机 Worker：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\start-worker.ps1 -Background
```

健康检查：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\health-check.ps1
```

启动临时公网隧道：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\start-cloudflare-tunnel.ps1 -Background
```

查看日志：

```powershell
Get-Content logs\worker.err.log -Tail 120
Get-Content logs\tunnel.err.log -Tail 120
```

## 本机配置

配置文件：

```text
C:\vmshare\minguo-fashion-miniprogram\backend\retouch-worker\.env
```

当前关键配置：

```text
RETOUCH_ENABLE_GFPGAN=true
RETOUCH_GFPGAN_MODEL=C:/vmshare/minguo-fashion-miniprogram/backend/retouch-worker/models/GFPGANv1.3.pth
RETOUCH_ENABLE_REALESRGAN=true
RETOUCH_REALESRGAN_MODEL=C:/vmshare/minguo-fashion-miniprogram/backend/retouch-worker/models/RealESRGAN_x4plus.pth
RETOUCH_DEVICE=cuda
```

`RETOUCH_WORKER_TOKEN` 是云函数调用本机 Worker 的密钥，微信云函数里必须填同一个值。

## 微信云函数配置

在微信云开发控制台给 `processRetouchOrder` 配置环境变量：

```text
RETOUCH_WORKER_URL=https://fan-spend-minutes-texts.trycloudflare.com
RETOUCH_WORKER_TOKEN=和本机 .env 里的 RETOUCH_WORKER_TOKEN 一致
RETOUCH_ADMIN_TOKEN=管理员触发口令
```

同时把 `processRetouchOrder` 的超时时间调到 `120` 秒以上。当前云函数代码内部请求 Worker 的超时是 120 秒，云函数平台本身也必须放宽。

临时公网地址重启后可能变化。如果地址变化，需要同步更新 `RETOUCH_WORKER_URL`。正式商用请使用固定域名，例如：

```text
https://retouch.yourdomain.com
```

## 开机自启动

注册 Worker 开机自启动：

```powershell
cd C:\vmshare\minguo-fashion-miniprogram\backend\retouch-worker
powershell -ExecutionPolicy Bypass -File scripts\register-startup-task.ps1
```

如果 Windows 拒绝注册计划任务，可以使用当前用户启动项。当前电脑已创建：

```text
C:\Users\wz\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\MinguoRetouchWorker.cmd
```

如果仍使用临时 tunnel，电脑重启后公网地址会变，不建议直接用于正式订单。固定 tunnel 配好后，再把固定域名写入微信云函数环境变量。

## 运行建议

- RTX 4060 8GB 建议单次订单先控制在 1-10 张。
- 大图处理会吃显存，`RETOUCH_MAX_EDGE=2400` 是比较稳的起点。
- 正式订单保留人工复核，AI 失败时订单会写入 `rejected` 和 `errorMessage`。
- Windows 电源计划改成高性能，并关闭睡眠。
- 只处理客户已授权上传和交付的照片。
