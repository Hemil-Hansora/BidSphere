import cron from "node-cron";
import { Auction } from "../models/auction.model.js";
import { User } from "../models/user.model.js";
import { Bid } from "../models/bid.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calculateCommission } from "../controllers/commission.controller.js";
import { sendEmail } from "../utils/sendMail.js";
import { PaymentProof } from "../models/paymentProof.model.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const approvedProofs = await PaymentProof.find({ status: "Approved" });
    for (const proof of approvedProofs) {
      try {
        const user = await User.findById(proof._id);
        let updatedUserData = {};
        if (user) {
          if (user.unpaidCommission >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                $inc: {
                  unpaidCommission: -proof.amount,
                },
              },
              { new: true }
            );
          }
        }
      } catch (error) {}
    }
  });
};
