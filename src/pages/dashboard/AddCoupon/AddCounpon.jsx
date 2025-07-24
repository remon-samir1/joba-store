import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs.jsx";
import { GeneralTab } from "./GeneralTabs.jsx";
import { GeneralFormFields } from "./GeneralFormFields.jsx";
import { UsageRestrictionTab } from "./UsegeRestrictionTab.jsx";
import { UsageLimitsTab } from "./UsageLimitTabs.jsx";
import { toast } from "react-toastify";
import { Axios } from "../../../../components/Helpers/Axios.js";
import Notifcation from "../../../../components/Notification.jsx";
import Loading from "../../../../components/Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";

export function CouponManagement() {
  const [loading , setLoading] = useState(false)
  const nav = useNavigate()
  const [form, setForm] = useState({
    code: "",
    type: "",
    value: "",
    min_purchase: "",
    max_purchase: "",
    max_uses: "",
    starts_at: new Date(),
    expires_at: "",
    is_active: true,
    max_uses_user: "",
  });

  const handleSubmit = async () => {
    setLoading(true)
    const emptyFields = Object.entries(form).filter(
      ([key, value]) => value === "" || value === null || value === undefined
    );
  
    if (emptyFields.length > 0) {
      const missing = emptyFields.map(([key]) => key).join(", ");
      toast.error(`Please fill all required fields: ${missing}`);
      return;
    }
  
    try {
      const response = await Axios.post("/admin/coupons", form); 
      toast.success("Coupon created successfully!");
      setLoading(false)
      nav(-1)
    } catch (error) {
      toast.error("Error submitting the form");
      console.error(error);
      setLoading(false)

    }
  };
  
  return (
    <div className="flex-1 flex flex-col gap-6 p-6">
      {
        loading && <Loading/>
      }
      <Notifcation/>
      {/* Page Title */}
      <h2 className="text-main-text text-[22px] font-semibold">
        Add new coupon
      </h2>

      {/* First Card - General Info */}
      <div className="w-full bg-white-color rounded-lg p-6 min-h-[447px]">
        <GeneralTab setForm={setForm} form={form} />
      </div>

      {/* Second Card - Coupon Details with Tabs */}
      <div className="w-full bg-white-color rounded-lg">
        <div className="p-6 pb-0">
          <h3 className="text-main-text text-[18px] font-medium mb-6">
            Coupon code
          </h3>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="px-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="usage-restriction">
              Usage restriction
            </TabsTrigger>
            <TabsTrigger value="usage-limits">Usage limits</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="px-0 py-6">
            <GeneralFormFields setForm={setForm} form={form} />
          </TabsContent>

          <TabsContent value="usage-restriction" className="px-0 py-6">
            <UsageRestrictionTab setForm={setForm} form={form} />
          </TabsContent>

          <TabsContent value="usage-limits" className="px-0 pb-4 pt-6">
            <UsageLimitsTab setForm={setForm} form={form} />
          </TabsContent>
        </Tabs>
      </div>
      <button className="text-white bg-primary px-6 hover:shadow shadow-primary py-2 rounded-xl w-max" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
