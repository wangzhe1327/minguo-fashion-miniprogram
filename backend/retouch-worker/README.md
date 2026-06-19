# AI Retouch Worker

这是“浮光旅影”小程序的独立 AI 修图后端服务。它接收云函数发来的订单照片临时链接，使用开源免费模型和本地图像算法处理照片，并返回 JPEG 结果给云函数上传到微信云存储。

## 模型策略

- 默认模式：OpenCV + Pillow，提供白平衡、局部对比、自然磨皮、锐化、胶片/旧照/电影感等特效。
- GPU 增强：安装并启用 GFPGAN 后做人脸修复。
- GPU 增强：安装并启用 Real-ESRGAN 后做商业精修超分和细节恢复。

GFPGAN 使用 Apache-2.0，Real-ESRGAN 使用 BSD-3-Clause，适合商业集成前的许可审查。

## 本地启动

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1
powershell -ExecutionPolicy Bypass -File scripts\start-worker.ps1 -Background
```

健康检查：

```bash
curl http://127.0.0.1:8080/health
```

## Docker 启动

```bash
docker build -t minguo-retouch-worker .
docker run --rm -p 8080:8080 --env-file .env minguo-retouch-worker
```

## GPU 模型启用

1. 安装与显卡匹配的 PyTorch CUDA 版本。
2. 安装 `requirements-gpu.txt`。
3. 下载模型权重：

```text
GFPGANv1.3.pth
RealESRGAN_x4plus.pth
```

4. 在 `.env` 中启用：

```text
RETOUCH_ENABLE_GFPGAN=true
RETOUCH_GFPGAN_MODEL=/models/GFPGANv1.3.pth
RETOUCH_ENABLE_REALESRGAN=true
RETOUCH_REALESRGAN_MODEL=/models/RealESRGAN_x4plus.pth
```

## 与微信云函数连接

部署服务后，把地址配置给云函数 `processRetouchOrder`：

```text
RETOUCH_WORKER_URL=https://your-worker.example.com
RETOUCH_WORKER_TOKEN=change-this-long-random-token
RETOUCH_ADMIN_TOKEN=another-admin-token
```

然后从后台或微信开发者工具调用 `processRetouchOrder`，传入：

```json
{
  "orderId": "retouchOrders 文档 id",
  "adminToken": "another-admin-token"
}
```

云函数会自动：

1. 读取订单。
2. 把原片转成临时 HTTPS 地址。
3. 调用本服务 `/process`。
4. 上传结果到微信云存储。
5. 回写 `resultPhotos` 和 `status = delivered`。
