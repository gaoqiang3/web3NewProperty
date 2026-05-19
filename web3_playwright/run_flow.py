import asyncio
import os
from playwright.async_api import async_playwright

# 1. 你的本地 HTML 文件路径（转换为浏览器认识的 file:// 协议）
TARGET_URL = "file:///E:/learn/PythonProject1/fronted/simpleFront.html"


async def main():
    metamask_path = os.path.abspath("./metamask")
    user_data_dir = os.path.abspath("./chrome_profile")

    async with async_playwright() as p:
        print("正在启动浏览器...")

        context = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            args=[
                f"--disable-extensions-except={metamask_path}",
                f"--load-extension={metamask_path}",
            ]
        )

        print("🦊 浏览器已启动！")
        await asyncio.sleep(2)  # 给插件留出加载时间

        # ----------------- 步骤 1：自动解锁小狐狸 -----------------
        target_page = None
        for p_window in context.pages:
            url = p_window.url
            if "notification.html" in url or "home.html" in url:
                target_page = p_window
                break

        if target_page:
            try:
                print("🎯 找到小狐狸页面，开始输入密码...")
                password_input = target_page.locator("[data-testid='unlock-password']")
                await password_input.wait_for(state="visible", timeout=5000)
                await password_input.fill("password1234")

                submit_button = target_page.locator("[data-testid='unlock-submit']")
                await submit_button.click()
                print("✅ 小狐狸解锁成功！")
                await asyncio.sleep(1.5)  # 等待解锁动画完成
            except Exception as e:
                print(f"❌ 自动填密码失败: {e}")
        else:
            print("💡 未检测到小狐狸锁屏页面，可能已经是登录状态。")

        # ----------------- 步骤 2：打开你的前端网页 -----------------
        print(f"🌐 正在打开本地前端页面: {TARGET_URL}")
        page = await context.new_page()
        await page.goto(TARGET_URL)

        # ----------------- 步骤 3：点击“连接钱包”按钮 -----------------
        try:
            print("🔗 正在寻找网页上的【连接钱包】按钮...")
            # 这里使用的是你之前代码里的 id="connectBtn"，如果不对可以自行修改
            connect_btn = page.locator("id=connectBtn")

            # 等待按钮在网页上显示出来并点击它
            await connect_btn.wait_for(state="visible", timeout=5000)
            await connect_btn.click()
            print("🚀 已成功点击【连接钱包】按钮！")
        except Exception as e:
            print(f"❌ 点击【连接钱包】按钮失败，原因: {e}")

        # ------------------------------------------------------------
        print("\n保持浏览器开启中，查看完效果后，可在终端按 Ctrl + C 结束脚本。")

        try:
            await asyncio.Event().wait()
        except KeyboardInterrupt:
            print("\n正在关闭浏览器...")
        finally:
            await context.close()


if __name__ == "__main__":
    asyncio.run(main())