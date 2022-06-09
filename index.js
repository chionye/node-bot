/** @format */
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = 80;
const url = "https://api.telegram.org/bot";
const { Telegraf, Markup } = require("telegraf");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bot = new Telegraf(process.env.API_KEY);
bot.selected_coin_details = "";
bot.selected_coin_name = "";

const startMessage = async (ctx) => {
  let message = `"Welcome to the Cornix Trading Bot!\n
Using our bot, you'll be able to automate your crypto trading with advanced trading features, designed to minimize risk and maximize profits.
\n\n
Whether you're trading with a signal provider, on your own, or using TradingView alerts, our bot will do the heavy lifting for you.
\n\n
Are you ready to trade with Cornix?`;
  return await ctx.reply(
    message,
    Markup.inlineKeyboard(
      [
        Markup.button.callback("Binance", "Binance"),
        Markup.button.callback("FTX", "FTX"),
        Markup.button.callback("KuCoin", "KuCoin"),
        Markup.button.callback("Huobi.Pro", "Huobi.Pro"),
        Markup.button.callback("Coinex", "Coinex"),
        Markup.button.callback("Kraken", "Kraken"),
        Markup.button.callback("Localbitcoins", "Localbitcoins"),
        Markup.button.callback("Cex.io", "Cex.io"),
        Markup.button.callback("Bitstamp", "Bitstamp"),
        Markup.button.callback("BULLIGON", "BULLIGON"),
        Markup.button.url("🗿 Support", "T.me/CornixTradingSupport_bot"),
      ],
      {
        wrap: (btn, index, currentRow) => 2 === currentRow.length,
      }
    )
  );
};

const selectCurrency = async (ctx) => {

}

bot.start((ctx) => {
  startMessage(ctx);
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

bot.action(/\b(?:Future|Spot)\b/gi, async (ctx) => {
  ctx.deleteMessage();
  const selected_coin = ctx.update.callback_query.data;
  return await ctx.reply(
    `Please select your preferred trading currency.`,
    Markup.inlineKeyboard(
      [
        Markup.button.callback("USDT TRC20", "USDT TRC20"),
        Markup.button.callback("Ripple XRP", "Ripple XRP"),
        Markup.button.callback("Bitcoin", "Bitcoin"),
        Markup.button.callback("Ethereum", "Ethereum"),
        Markup.button.callback("Bitcoin Cash", "Bitcoin Cash"),
        Markup.button.callback("BNB", "BNB"),
        Markup.button.callback("Smart Chain", "Smart Chain"),
        Markup.button.callback("Litecoin", "Litecoin"),
        Markup.button.callback("Polygon", "Polygon"),
        Markup.button.callback("Tron", "Tron"),
        Markup.button.callback("Cosmos Hub", "Cosmos Hub"),
        Markup.button.callback("Fantom", "Fantom"),
        Markup.button.callback("THORChain", "THORChain"),
        Markup.button.callback("DogeCoin", "DogeCoin"),
        Markup.button.callback("Waves", "Waves"),
        Markup.button.callback("Theta", "Theta"),
        Markup.button.callback("Kava", "Kava"),
        Markup.button.callback(
          "Bella Protocol BEL  BEP20",
          "Bella Protocol BEL  BEP20"
        ),
        Markup.button.callback("Stellar", "Stellar"),
        Markup.button.callback(`Back to start`, `Back to start`),
      ],
      {
        wrap: (btn, index, currentRow) => 1 === currentRow.length,
      }
    )
  );
});

bot.action(
  /\b(?:USDT TRC20|Ripple XRP|Bitcoin|Ethereum|Bitcoin Cash|BNB|Smart Chain|Litecoin|Polygon|Tron|Cosmos Hub|Fantom|THORChain|DogeCoin|Waves|Theta|Kava  Bella Protocol BEL  BEP20|Stellar)\b/gi,
  async (ctx) => {
    ctx.deleteMessage();
    const selected_coin = ctx.update.callback_query.data;
    bot.selected_coin_name = selected_coin;
    const value =
      selected_coin.split(" ").length > 2
        ? selected_coin.split(" ")[0] + " " + selected_coin.split(" ")[1]
        : selected_coin.split(" ")[0];
    bot.selected_coin_details = value;
    return await ctx.reply(
      `Alright👍. Please enter amount of ${value} you would like to invest?\n(Enter value in digits).`
    );
  }
);

bot.action(
  /\b(?:Binance|FTX|KuCoin|Huobi.Pro|Coinex|Kraken|Bitstamp|Localbitcoins|Cex.io)\b/gi,
  async (ctx) => {
    ctx.deleteMessage();
    const selected_coin = ctx.update.callback_query.data;
    return await ctx.reply(
      `Please select your preferred exchange.`,
      Markup.inlineKeyboard(
        [
          Markup.button.callback(
            `${selected_coin} Future`,
            `${selected_coin} Future`
          ),
          Markup.button.callback(
            `${selected_coin} Spot`,
            `${selected_coin} Spot`
          ),
          Markup.button.callback(`Back to start`, `Back to start`),
        ],
        {
          wrap: (btn, index, currentRow) => 1 === currentRow.length,
        }
      )
    );
  }
);

bot.hears(/[0-9]/g, async (ctx) => {
  ctx.deleteMessage();
  const amount = ctx.update.message.text;
  let wallet_address = "";
  switch (bot.selected_coin_name) {
    case "USDT TRC20":
      wallet_address = "TEt994ic4uqN581y9gYX7sWaJyJkpkZCpW";
      break;
    case "Ripple XRP":
      wallet_address = "rw9vEwk2UnVCQ1csBCiQLyfhMcrVzM3p5U";
      break;
    case "Bitcoin":
      wallet_address = "bc1qm550h0watgcsd8nwdk6sguzxs7cnapd324dykd";
      break;
    case "Ethereum":
      wallet_address = "0x657c58a55a234E27774696a8F58963e439B16384";
      break;
    case "Bitcoin Cash":
      wallet_address = "qqjqe98lass90ng5ahpcgk5zen89kvh86q6kykwm7r";
      break;
    case "BNB":
      wallet_address = "bnb17fdhnr627227yvn4swavdc7ffmk2prhv6kk5w7";
      break;
    case "Smart Chain":
      wallet_address = "0x657c58a55a234E27774696a8F58963e439B16384";
      break;
    case "Litecoin":
      wallet_address = "ltc1qrljc96rrhrnt5yc4gwme7ur656lvaedgwgafg8";
      break;
    case "Polygon":
      wallet_address = "0x657c58a55a234E27774696a8F58963e439B16384";
      break;
    case "Tron":
      wallet_address = "TEt994ic4uqN581y9gYX7sWaJyJkpkZCpW";
      break;
    case "Cosmos Hub":
      wallet_address = "cosmos1jjhn5k0f6njt89a8gl53s6nfs3us3rghfx6wcf";
      break;
    case "Fantom":
      wallet_address = "0x657c58a55a234E27774696a8F58963e439B16384";
      break;
    case "THORChain":
      wallet_address = "thor1uahpvp7ztmh0ltey2p8365z9pptt5ky0d43ca3";
      break;
    case "DogeCoin":
      wallet_address = "DM13rMEDZcmLj2UGWWeQyEWn9MZDzj15B8";
      break;
    case "Waves":
      wallet_address = "3P9vnWY38L5AWZfyFJBZBbqm2PYgRHwjoM2";
      break;
    case "Theta":
      wallet_address = "0xB81fe235083ef7E4E4fC7704F45Cb90151C41270";
      break;
    case "Kava":
      wallet_address = "kava1kzr2ldwzdgekhuq33n6hts4qh40j765wnnzt7d";
      break;
    case "Bella Protocol BEL  BEP20":
      wallet_address = "0x657c58a55a234E27774696a8F58963e439B16384";
      break;
    case "Stellar":
      wallet_address =
        "GB3YQJXX3UVVJWHW2HUBLCV4ZSO3J6FGIACG5OVHS4CK3T7U25RSKA3G";
      break;
    case "Polkadot (DOT)":
      wallet_address = "1ztmvEqzyUDeQwZqFbofwKRqaxpYUbKYVScVv5HFXWM3MvG";
      break;
    default:
      wallet_address = "";
  }
  const message = `Please send ${amount} ${bot.selected_coin_details} to the following address:\n\n ${wallet_address} \n\nOnce your payment is confirmed, the bot will begin trading`;
  return await ctx.reply(
    message,
    Markup.inlineKeyboard(
      [
        Markup.button.callback(
          `I've sent the payment`,
          `I've sent the payment`
        ),
        Markup.button.callback(`Back to start`, `Back to start`),
      ],
      {
        wrap: (btn, index, currentRow) => 1 === currentRow.length,
      }
    )
  );
});

bot.action("Back to start", async (ctx) => {
  startMessage(ctx);
});

bot.action("I've sent the payment", async (ctx) => {
  ctx.deleteMessage();
  return await ctx.reply(
    "Please send transaction ID/Hash as proof of payment.\nThis will be automatically processed by the bot"
  );
});

bot.hears(/^[\d\w]{64}/gi, async (ctx) => {
  ctx.deleteMessage();
  return await ctx.reply(
    "Awesome😃.\nYour payment will be validated and trading will start..."
  );
});

bot.launch();
