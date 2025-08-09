import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs.jsx";
import { GeneralTab } from "./GeneralTabs.jsx";
import { GeneralFormFields } from "./GeneralFormFields.jsx";
import { UsageRestrictionTab } from "./UsegeRestrictionTab.jsx";
import { UsageLimitsTab } from "./UsageLimitTabs.jsx";
import { toast } from "react-toastify";
import { Axios } from "../../../../components/Helpers/Axios.js";
import Notifcation from "../../../../components/Notification.jsx";
import { useNavigate } from "react-router-dom";

export function CouponManagement() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
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
const { max_uses_user,max_uses , ...formError} =form 

  const handleSubmit = async () => {
    setLoading(true);
    const emptyFields = Object.entries(formError).filter(
      ([key, value]) => value === "" || value === null || value === undefined
    );
    if(form.max_uses === '' & form.max_uses_user === ''){
      toast.error(`Please fill Usage limit per coupon or Usage limit per user`);
      setLoading(false);
      return;

    }
    if (emptyFields.length > 0) {
      const missing = emptyFields.map(([key]) => key).join(", ");
      toast.error(`Please fill all required fields: ${missing}`);
      setLoading(false);
      return;
    }
  
    try {
      const response = await Axios.post("/admin/coupons", form); 
      toast.success("Coupon created successfully!");
      setLoading(false);
      nav(-1);
    } catch (error) {
      toast.error("Error submitting the form");
      console.error(error);
      setLoading(false);
    }
  };
  
  // شاشة التحميل المحترفة
  const ProfessionalLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          {/* Spinner Animation */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-4 border-secondary border-b-transparent animate-spin-reverse"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-primary h-2.5 rounded-full animate-pulse" 
              style={{ width: '65%' }}
            ></div>
          </div>
          
          {/* Text Content */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">Creating Coupon</h3>
          <p className="text-gray-600 text-center mb-6">
            Please wait while we process your request...
          </p>
          
          {/* Dots Animation */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 relative">
      {loading && <ProfessionalLoader />}
      
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
      
      <button 
        className="text-white bg-primary px-6 hover:shadow shadow-primary py-2 rounded-xl w-max transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </div>
  );
}