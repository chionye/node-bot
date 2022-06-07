/** @format */
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 80;
const url = "https://api.telegram.org/bot";
const apiToken = "5456509483:AAHR8v5lgNAQBeR1nMLvKNFSb6WG-_j4vNU";
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(apiToken);

bot.use(Telegraf.log());

bot.start( async (ctx) => {
  console.log(ctx.from);
  let message = `"Welcome to Cornix Trading Bot, your automated trading partner! \n Please type /help for more information. \n \nCornix Trading Bot is a bot that will help you trade cryptocurrencies with ease. \n \n This bot is still in development, so please be patient. \n \n If you have any questions, please contact @joshuacornix. \n\n Please select one of the following options to begin:"`;
   return await ctx.reply(message, Markup
    .keyboard([
      ['Invest now'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
  )
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("Invest now", async (ctx) => {
  console.log(ctx.from);
  return await ctx.reply(
    "Please choose an investment plan 😁",
    Markup.keyboard([
      ["ETHEREUM BULLIGON", "INTEGRAL BULLIGON"], // Row1 with 2 buttons
      ["BITCOIN BULLIGON", "BNB BULLIGON"], // Row2 with 2 buttons
    ])
    .oneTime()
    .resize()
  );
});

bot.hears("/BULLIGON/", (ctx) => ctx.reply("Alright👍! How much would you like to invest?"));

bot.launch();