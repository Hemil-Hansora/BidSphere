import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  useEffect(() => {
    if (user.role !== "admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full min-h-screen pt-20 px-4 lg:pl-[300px] bg-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col gap-10 pb-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl font-bold text-[#d6482b] transition-all">
                Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, Admin 👋</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              <SectionCard title="Monthly Total Payments Received">
                <PaymentGraph />
              </SectionCard>

              <SectionCard title="Users Overview">
                <BiddersAuctioneersGraph />
              </SectionCard>

              <div className="md:col-span-2">
                <SectionCard title="Manage Payment Proofs">
                  <PaymentProofs />
                </SectionCard>
              </div>

              <div className="md:col-span-2">
                <SectionCard title="Delete Items From Auction">
                  <AuctionItemDelete />
                </SectionCard>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Dashboard;
