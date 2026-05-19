import subprocess

# 测试 1：不加 text=True（默认是二进制）
print("===== 不加 text=True 输出（字节类型）=====")
result1 = subprocess.run(
    ["cmd", "/c", "echo hello world"],  # 这里改了！Windows 专用写法
    capture_output=True,
)
print("类型:", type(result1.stdout))
print("内容:", result1.stdout)

print("\n" + "="*50)

# 测试 2：加 text=True（字符串类型）
print("===== 加 text=True 输出（字符串）=====")
result2 = subprocess.run(
    ["cmd", "/c", "echo hello world"],  # 这里也改了
    capture_output=True,
    text=True,
)
print("类型:", type(result2.stdout))
print("内容:", result2.stdout)