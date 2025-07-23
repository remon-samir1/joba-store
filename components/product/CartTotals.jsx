import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Axios } from "../Helpers/Axios";

export function CartTotals({ quantity}) {
  const [cart , setCart] = useState([])
  useEffect(() => {
    Axios.get("/cart").then(
      (data) => {
        setCart(data.data.data.items);
        console.log(data.data.data.items);
      },
    );
  }, []);
  const subtotal = cart?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <div className="space-y-8 mt-8">
      <h2 className="text-2xl font-semibold text-gray-900">Cart Totals</h2>

      <div className="space-y-6">
        {/* Totals breakdown */}
        <div className="space-y-6">
          {/* <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Quantity</span>
            <span className="text-gray-600">x {quantity}</span>
          </div> */}

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Subtotal</span>
            <span className="text-gray-600">
              EGP {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Shipping</span>
            <span className="text-gray-600">Free Shipping</span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">
              EGP {subtotal.toLocaleString()}
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

    
    </div>
  );
}
