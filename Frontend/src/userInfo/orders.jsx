import React from "react";
import { useSelector } from "react-redux";

export const MyOrder = () => {
  const order = useSelector((state) => state.order.order);
console.log(order)
  if (!order || order.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-5">My Orders</h1>

      {order.map((o) => (
        <div
          key={o._id}
          className="border rounded-lg p-4 mb-6 shadow-sm bg-white"
        >
          {/* Order Info */}
          <div className="mb-3">
            <p>
              <span className="font-medium">Order ID:</span> {o.orderId}
            </p>
            <p>
              <span className="font-medium">Payment ID:</span>{" "}
              {o.paymentId || "Pending"}
            </p>
            <p>
              <span className="font-medium">Delivery Status:</span>{" "}
              {o.delivery_status || "proccesing"}
            </p>

            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              <span
                className={`font-semibold ${
                  o.payment_status === "Paid" ? "text-green-600" : "text-red-500"
                }`}
              >
                {o.payment_status}
              </span>
            </p>
            <p>
              <span className="font-medium">Created At:</span>{" "}
              {new Date(o.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Updated At:</span>{" "}
              {new Date(o.updatedAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Admin Note:</span>{" "}
              {o.admin_note || ""}
            </p>
          </div>

          {/* Products */}
          <div className="border-t pt-3">
            <h2 className="font-medium mb-2">Products:</h2>
            {o.product_details && Array.isArray(o.product_details) && o.product_details.length > 0 ? (
              o.product_details.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 mb-3 last:mb-0"
                >
                  <img
                    src={p.image?.[0] || "https://via.placeholder.com/60"}
                    alt={p.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">ID: {p._id}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No products found</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="border-t pt-3 mt-3 flex justify-between font-medium">
            <p>Subtotal: ৳ {o.subTotalAmt}</p>
            <p>Total: ৳ {o.totalAmt}</p>
          </div>
        </div>
      ))}
    </section>
  );
};