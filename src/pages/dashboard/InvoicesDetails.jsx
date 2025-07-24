import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import TransformDate from "../../../components/Helpers/TransformDate";
import { useRef } from "react";
import { Axios } from "../../../components/Helpers/Axios";
const OrderStudentHistoryDetails = () => {
  const scrollRef = useRef(null);
  //  get data
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    scrollRef.current.scrollIntoView();
    Axios.get(`/invoices`).then((data) => {
      setData(data.data.data.data.filter(data => data.order_id == id)[0]);
      console.log(data.data.order);
    });
  }, []);

  return (
    <div ref={scrollRef} className="OrderDetails">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Order details</h3>
        <Breadcrumbs />
      </div>
      <div className="invoices">
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
              <p> {data?.name}</p>
              {/* <p>{data?.buyer?.phone}</p> */}
              {/* <p>{data?.buyer?.email}</p> */}
              {/* <p>{data?.buyer?.address}</p> */}
              <p>{data?.payment_method}</p>
              <p>{data?.payment_status}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-base font-bold text-textColor whitespace-nowrap">
              Order Id:
            </p>
            <p className="text-base font-bold text-textColor whitespace-nowrap">
              {data?.invoice_id}
            </p>
          </div>
        </div>
      </div>
      <div className="table mt-16">
        <h4 className="text-main mb-6">Order summary</h4>
        <Table gray />
      </div>

      <div className="boxes flex justify-start items-center gap-8 mt-8">
        <div className="flex justify-start items-end h-[344px] gap-3 flex-col w-full md:w-[100%] bg-white">
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">subtotal</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.subTotal} {data?.payable_currency}
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Getway charge</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.gateway_charge} {data?.payable_currency}
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1">
            <p className=" text-[#999999] text-[12px]  ">Discount</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.discount} {data?.payable_currency}
            </p>
          </div>
          <div className="w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Total</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {data?.paid_amount} {data?.payable_currency}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-8">
        <button
          onClick={() => window.print()}
          className="text-white bg-btnColor px-8 py-2 rounded border-btnColor flex justify-center items-center gap-2 hover:scale-105 duration-500"
        >
          <Icon
            icon="material-symbols:print-outline"
            style={{ color: "#fff" }}
          />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};

export default OrderStudentHistoryDetails;
