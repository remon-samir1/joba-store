import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./InvoicesDetails.css";
import { Axios } from "../../../components/Helpers/Axios";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import TransformDate from "../../../components/Helpers/TransformDate";
import { Printer } from "lucide-react";
const InvoicesDetails = () => {
  const scrollRef = useRef(null);
  //  get data
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
    Axios.get(`/admin/orders/${id}`).then((data) => {
      setData(data.data.data);
      console.log(data.data);
    });
  }, []);
  console.log(data);
  const handleStatus =(value)=>{
    if(value === ''){
      return null ;
    }
    try{
Axios.post(`/admin/orders/${id}` , {
  status:value,
  _method:'PUT'
}).then(data => console.log(data))
    }catch(err){

    }
  }
  return (
    <div ref={scrollRef} className="OrderDetails">
      <DashboardHeader />
      <div className="invoices p-5">
        <h4>invoices</h4>
        <div className="flex justify-between md:flex-nowrap flex-wrap gap-4 items-start w-full">
          <div className="details">
            <div className="hedaers">
              <p>Order date:</p>
              <p>Billed to:</p>
              <p>Phone Number:</p>
              <p>Email:</p>
              <p>Address:</p>
              <p>Paymentn Method:</p>
              <p>Paymentn Status:</p>
            </div>
            <div className="data">
              <p>{TransformDate(data?.created_at)}</p>
              <p> {data?.shipping_name}</p>
              <p>{data?.user?.phone || "Empty"}</p>
              <p>{data?.user?.email || "Empty"}</p>
              <p>{data?.shipping_address || "Empty"}</p>
              <p>On Delivery</p>
              <p>{data?.payment_status}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-base font-bold text-textColor whitespace-nowrap">
              Order Id:
            </p>
            <p className="text-base font-bold text-textColor whitespace-nowrap">
              {data?.id}
            </p>
          </div>
        </div>
      </div>

      <div className="boxes flex justify-start items-center gap-8 mt-8">
        <div className="flex justify-start items-end h-[344px] gap-3 flex-col w-full md:w-[100%] bg-white">
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">subtotal</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.total}
            </p>
          </div>
          {/* <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Getway charge</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.gateway_charge} {data?.payable_currency}
            </p>
          </div> */}
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1">
            <p className=" text-[#999999] text-[12px]  ">Discount</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.discount_amount}
            </p>
          </div>
          <div className="w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Total</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.total}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start  gap-5 items-center lg  m-8">
        <button
          onClick={() => window.print()}
          className="text-white bg-btnColor bg-blue-800 w-max rounded- px-8 py-2 rounded border-btnColor flex justify-center items-center gap-2 hover:scale-105 duration-500"
        >
          <Printer />
          <span>Print</span>
        </button>
        <select 
        onChange={(e)=>handleStatus(e.target.value)}
          className="text-white bg-btnColor outline-none  bg-primary w-max rounded- px-8 py-2 rounded border-btnColor flex justify-center items-center gap-2 hover:scale-105 duration-500"
        
        >
          <option className="bg-white text-primary" value="">status</option>
          <option className="bg-white text-primary" value="pending">Pending</option>
          <option className="bg-white text-primary" value="completed">Compeleted</option>
          <option className="bg-white text-primary" value="cancelled">Cancelled</option>
          <option className="bg-white text-primary" value="shipped">Shipped</option>
        </select>
      </div>
    </div>
  );
};

export default InvoicesDetails;
