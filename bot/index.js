require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
const WEBAPP_URL = process.env.WEBAPP_URL

bot.start(async (ctx) => {
  await ctx.reply(
    "Привет! Открывай меню 👇",
    Markup.inlineKeyboard([
      Markup.button.url("Открыть меню", WEBAPP_URL),
    ])
  )
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log("BOT started. WEBAPP_URL =", WEBAPP_URL)