import Quotes from "../../../models/quotesModel";
import dbConnect from "../../../Utils/mongoDB";

const handler = async (req, res) => {
  console.log("Quotes calling");
  if (req.method === "POST") {
    const QuotesResponse = req.body.data;
    if (QuotesResponse) {
      try {
        const newQuote = new Quotes({
          author: QuotesResponse.author,
          quotecontent: QuotesResponse.quotecontent,
        });
        Quotes.find({}, async (err, foundQuotes) => {
          await newQuote.save((error) => {
            if (!error) {
              res.status(200).json(foundQuotes);
            } else {
              // console.log({ error })
            }
          });
        });
      } catch (error) {
        // console.log({ error })
      }
    }
  } else {
    Quotes.find({}, (err, foundQuotes) => {
      res.status(200).json(foundQuotes);
    });
  }
};

export default dbConnect(handler);
