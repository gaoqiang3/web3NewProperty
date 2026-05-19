import asyncio
import os
from playwright.async_api import async_playwright


async def main():
    # 获取小狐狸文件夹的绝对路径
    metamask_path = os.path.abspath("./metamask")
    # 创建一个文件夹来存浏览器数据（这样你手动登录后，下次就不用重新登录了）
    user_data_dir = os.path.abspath("./chrome_profile")

    async with async_playwright() as p:
        print("正在启动浏览器...")

        # 启动带插件的浏览器
        context = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir ,
            headless=False,  # 必须是 False，不然你看不到浏览器
            args=[
                f"--disable-extensions-except={metamask_path}",
                f"--load-extension={metamask_path}",
            ]
        )

        print("🦊 浏览器已启动！小狐狸插件应该已经弹出了。")
        print("现在你可以手动在浏览器里：")
        print("1. 初始化小狐狸钱包")
        print("2. 导入你的 Anvil 私钥")
        print("确认人肉操作完成后，在终端按 Ctrl + C 结束脚本。")

        # 让程序挂起，防止浏览器闪退
        try:
            await asyncio.Event().wait()
        except KeyboardInterrupt:
            print("\n正在关闭浏览器...")
        finally:
            await context.close()


if __name__ == "__main__":
    asyncio.run(main())