import subprocess
import sys
import os

# 当前目录
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

# 启动后端（Flask）
print("Starting backend...")
backend_process = subprocess.Popen(
    [sys.executable, "main.py"],
    cwd=ROOT_DIR
)

# 启动前端（Vite）

print("Starting frontend...")
frontend_dir = os.path.join(ROOT_DIR, "frontend")

frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=frontend_dir,
    shell=True
)

print("\nSystem started successfully!")
print("Backend:  http://127.0.0.1:5000")
print("Frontend: http://localhost:5173 (或5174)")
print("\nPress Ctrl+C to stop...")

# 保持运行
try:
    backend_process.wait()
    frontend_process.wait()
except KeyboardInterrupt:
    print("\nStopping system...")
    backend_process.terminate()
    frontend_process.terminate()