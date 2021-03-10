// calendar.controller.js - Calendar logic module

const styles = `<style type="text/css">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Slab:wght@100;400;700&display=swap');

  #calendarTitle, #td-print-image-id, #td-print-text-id {
    display: none !important;
  }

  html, body {
    background: none !important;
  }

  .te-s, .te-t, .title, event-summary, .day, .ui-rtsr {
    color: #27246A !important;
    font-family: Roboto slab, serif !important;
  }

  .date-top {
    font-family: Roboto slab, serif !important;
  }

  .date-label, .event {
    padding: .1em 1em !important;
  }

  .detail-content {
    font-family: Open Sans, sans-serif !important;;
  }
</style>`;

const iframeUrl =
  "https://calendar.google.com/calendar/embed?&src=texashacs%40gmail.com&ctz=America%2FChicago";
const iframeMobileUrl =
  "https://calendar.google.com/calendar/embed?mode=AGENDA&src=texashacs%40gmail.com&ctz=America%2FChicago";

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  read,
};

// Retrieve iframe URL for gCal
async function read(agenda) {
  console.log(agenda ? iframeMobileUrl : iframeUrl);
  return await axios.get(agenda ? iframeMobileUrl : iframeUrl).then((res) => {
    const $ = cheerio.load(res.data);
    $("head").append(styles);
    return $.html();
  });
}
