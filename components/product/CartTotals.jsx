import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";
import { Axios } from "../Helpers/Axios";

export function CartTotals({ quantity, subtotal, shipping, total }) {
  useEffect(()=>{
    Axios.get('https://goba-ecommerce.sunmedagency.com/api/cart').then(data=>console.log(data))
  },[])
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Cart Totals</h2>

      <div className="space-y-6">
        {/* Totals breakdown */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Quantity</span>
            <span className="text-gray-600">x {quantity}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Subtotal</span>
            <span className="text-gray-600">
              EGP {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Shipping</span>
            <span className="text-gray-600">{shipping}</span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">
              EGP {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Send Request Button */}
        <Button
          onClick={() => {
            const orderForm = document.getElementById("order-form");
            if (orderForm) {
              const formInputs = orderForm.querySelectorAll("input[required], input");
              const emptyFields = Array.from(formInputs).filter(
                (input) => !input.value
              );

              if (emptyFields.length > 0) {
                alert("Please fill in the order form first");
                orderForm.scrollIntoView({ behavior: "smooth" });
              } else {
                alert("Request sent successfully! We will process your order soon.");
              }
            }
          }}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4"
        >
          Send Request
        </Button>
      </div>

      {/* Product Image */}
      <div className="mt-8">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/574bb603bfc09a64bc8e7cd125be78d22810b015?width=500"
          alt="Product"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
