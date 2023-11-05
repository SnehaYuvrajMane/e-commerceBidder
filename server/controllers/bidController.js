import connectDB from "../database/db.js";
import bidModel from "../models/BidModel.js";

const getBids = async (req, res) => {
  const bids = await bidModel.find({});
  res.json(bids);
};

const getBidsByProductId = async (req, res) => {
    connectDB()
    console.log(req.params.id);
  const bids = await bidModel.find({ product_id: req.params.id });
  res.json(bids);
};

const getBidsByUserId = async (req, res) => {
  const bids = await bidModel.find({ user: req.params.id });
  res.json(bids);
};

const getBidsByUserIdAndProductId = async (req, res) => {
  const bids = await bidModel.find({
    user: req.params.userId,
    product: req.params.productId,
  });
  res.json(bids);
};

const createBid = async (data) => {
    try{
        connectDB()
        const bid = new bidModel(data);
        const createdBid = await bid.save();
        console.log("create",createBid);
        const bids = bidModel.find({product_id:data.product_id})
        console.log(bids);
        return bids
    }
    catch(error){
        console.log(error);
        return false
    }

};

const updateBid = async (req, res) => {
  const { user, product, bid_price, bid_date } = req.body;

  const bid = await bidModel.findById(req.params.id);

  if (bid) {
    bid.user = user;
    bid.product = product;
    bid.bid_price = bid_price;
    bid.bid_date = bid_date;

    const updatedBid = await bid.save();
    res.json(updatedBid);
  } else {
    res.status(404);
    throw new Error("Bid not found");
  }
};

const deleteBid = async (req, res) => {
  const bid = await bidModel.findById(req.params.id);

  if (bid) {
    await bid.remove();
    res.json({ message: "Bid removed" });
  } else {
    res.status(404);
    throw new Error("Bid not found");
  }
};

export {
  getBids,
  getBidsByProductId,
  getBidsByUserId,
  getBidsByUserIdAndProductId,
  createBid,
  updateBid,
  deleteBid,
};
