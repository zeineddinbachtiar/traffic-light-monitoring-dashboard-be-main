import asyncio
from telegram import Bot

TOKEN = '7603091653:AAHlmmzJ6HTLwLOpWw0N1I9kkApwvGxzNHI'

async def main():
    bot = Bot(token=TOKEN)
    await bot.send_message(chat_id='1712588932', text='ECG KEHILANGAN SINYAL!')

asyncio.run(main())
