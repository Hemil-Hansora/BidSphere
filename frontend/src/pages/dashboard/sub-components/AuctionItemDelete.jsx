import { deleteAuctionItem } from "@/store/slices/adminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions = [] } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this auction?");
    if (confirmDelete) {
      dispatch(deleteAuctionItem(id));
    }
  };

  return (
    <div className="overflow-x-auto mb-10 shadow rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold">Image</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Title</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {allAuctions.length > 0 ? (
            allAuctions.map((auction) => (
              <tr key={auction._id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-6">
                  <img
                    src={auction.image || "/default-image.png"}
                    alt={auction.title}
                    className="h-14 w-14 object-cover rounded-md shadow"
                    onError={(e) => (e.target.src = "/default-image.png")}
                  />
                </td>
                <td className="py-3 px-6">{auction.title}</td>
                <td className="py-3 px-6">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/auction/details/${auction._id}`}
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAuctionDelete(auction._id)}
                      className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-10 text-gray-500 text-lg">
                No Auctions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
