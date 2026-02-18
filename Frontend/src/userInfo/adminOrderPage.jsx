import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { AxiosToastError } from "../common config/axiosToastEross";
import { Axios } from "../common config/axiox";
import { SummaryApi } from "../common config/summayApi";
import { useGlobalContext } from '../provider';
import { toast } from "react-toastify";

function AdminOrderPage() {
  const orders = useSelector((state) => state.order.order) || [];
  console.log(orders)
const [editingOrderId, setEditingOrderId] = useState(null);
const [deliveryStatus, setDeliveryStatus] = useState("");
const [adminNote, setAdminNote] = useState("");
const [openEditBox , setOpenEditBox] = useState(false)
  const [search, setSearch] = useState("");
   const { getOrder} = useGlobalContext()
  const filteredOrders = orders.filter(
    (o) =>
      o.userId?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      o.payment_status?.toLowerCase().includes(search.toLowerCase())
  );
  const markAsSeen = async (orderId) =>{
    try {
      await Axios(SummaryApi.markAsSeen(orderId))
      getOrder()
    } catch (error) {
      AxiosToastError(error)
    }
  }
  const updateOrder = async (orderId , delivery_status, admin_note) =>{
    console.log('Updating order',orderId)
    console.log('Delivery Status',delivery_status)
    console.log('Admin Note', admin_note)
    try {

      const res = await Axios({
        ...SummaryApi.updateOrder(orderId),
        data : {
          delivery_status,
          admin_note        
        }
      })
      const {data : resData} = res
      if(resData.success) {
        toast.success('Order updated')
        getOrder()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Order Management
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by User ID, Order ID, Payment Status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 w-full rounded-lg shadow-sm mb-6 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {filteredOrders.map((order) => (
<div
  key={order._id}
  className={`p-4 rounded-lg shadow mb-4 border 
  ${!order.isSeen ? "bg-yellow-50 border-l-4 border-yellow-500" : "bg-white"}`}
>
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium">{order.userId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order.orderId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  order.payment_status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.payment_status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment ID</p>
              <p>{order.paymentId || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Invoice</p>
              {order.invoice_receipt ? (
                <a
                  href={order.invoice_receipt}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Receipt
                </a>
              ) : (
                "N/A"
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Product List */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-3">Products</h2>

            {order.product_details.map((prod) => (
              <div
                key={prod._id}
                className="flex items-center gap-4 mb-3 border-b pb-2"
              >
                <img
                  src={prod.image?.[0]}
                  alt={prod.name}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{prod.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {prod.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ৳{prod.price}
                  </p>
                </div>

                <div className="font-semibold">
                  ৳{prod.quantity * prod.price}
                </div>
              </div>
            ))}
          </div>
<div className="mt-2 p-2 border rounded bg-gray-50">
  <p className="font-semibold">Delivery Address:</p>
  <p>{order.delivery_adress?.adress_line}, {order.delivery_adress?.city}, {order.delivery_adress?.state}</p>
  <p>{order.delivery_adress?.country} - {order.delivery_adress?.pincode}</p>
  <p>Phone: +880 {order.delivery_adress?.mobile}</p>
</div>
          {/* Order Summary */}
          <div className="border-t pt-4 mt-4 text-right">
            <p className="text-sm">
              Subtotal: <span className="font-medium">৳{order.subTotalAmt}</span>
            </p>
            <p className="text-lg font-bold">
              Total: ৳{order.totalAmt}
            </p>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => markAsSeen(order._id)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all
                          ${order.isSeen 
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                            : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md"}`}
              disabled={order.isSeen}
            >
              {order.isSeen ? "Read" : "Mark as Read"}
            </button>


           <FaRegEdit
          className="w-6 h-6 text-green-700 hover:text-green-900 cursor-pointer"
          onClick={() => {
            setEditingOrderId(order._id);
            setDeliveryStatus(order.delivery_status);
            setAdminNote(order.admin_note);
            setOpenEditBox(true)
          }}
        />
          </div>
  {  openEditBox && editingOrderId === order._id && (
  <div className="mt-4 border-t pt-4 space-y-3 bg-gray-50 p-3 rounded-md">

    {/* Delivery Status */}
    <div>
      <label className="text-sm text-gray-600 flex justify-between px-2">
        Delivery Status 
        <MdCancel 
        onClick={()=> setOpenEditBox(false)}
        className="w-5 h-5 text-red-500 hover:text-red-800"/></label>
      
      <select
        value={deliveryStatus}
        onChange={(e) => setDeliveryStatus(e.target.value)}
        className="w-full border p-2 rounded mt-1"
      >
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    {/* Admin Note */}
    <div>
      <label className="text-sm text-gray-600">Admin Note</label>
      <textarea
        value={adminNote}
        onChange={(e) => setAdminNote(e.target.value)}
        className="w-full border p-2 rounded mt-1"
        rows="3"
        placeholder="Write admin note..."
      />
    </div>

    {/* Update Button */}
    <button
      onClick={() => {
        updateOrder(order._id, deliveryStatus, adminNote);
        setEditingOrderId(null);
      }}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Update Order
    </button>
  </div>
)}
        </div>
        
      ))}

      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500">No Orders Found</p>
      )}
    </div>
  );
}

export default AdminOrderPage;