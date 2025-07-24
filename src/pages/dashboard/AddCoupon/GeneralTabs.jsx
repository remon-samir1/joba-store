import React from 'react';

export function GeneralTab({form , setForm}) {
  function generateRandomString(length = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  console.log(generateRandomString()); 
  
  return (
    <div className="flex w-full flex-col items-start gap-8 px-6 py-6">
      {/* First Section */}
      <div className="flex flex-col items-start gap-6 w-full">
        {/* Coupon Code Input */}
        <div className="flex h-[94px] flex-col items-start gap-4 w-full">
          <label className="w-full text-main-text text-[18px] font-medium">
            Coupon code
          </label>
          <div className="flex w-full items-center border border-stroke rounded bg-white-color">
            <input
            value={form.code}
            onChange={(e)=>setForm({...form , code : e.target.value})}
              type="text"
              placeholder="Coupon code"
              className="flex-1 px-4 py-4 text-[18px] text-main-text placeholder:text-gray-placeholder border-0 outline-none rounded"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={()=>setForm({...form , code : generateRandomString()})} className="flex w-[201px] h-12 px-3 py-2.5 justify-center items-center gap-1 rounded bg-primary-orange-light shadow-sm border border-primary-orange/20 hover:bg-primary-orange/20 transition-colors">
          <span className="text-primary-orange text-[18px] font-medium">
            Generate coupon
          </span>
        </button>
      </div>

      {/* Description Section */}
      <div className="flex h-[201px] flex-col items-start gap-4 w-full">
        <label className="w-full text-main-text text-[18px] font-medium">
          Description
        </label>
        <div className="flex w-full h-[163px] border border-stroke rounded bg-white-color">
          <textarea
            placeholder="Description...."
            className="flex-1 px-4 py-4 text-[18px] text-main-text placeholder:text-gray-placeholder border-0 outline-none resize-none rounded"
          />
        </div>
      </div>
    </div>
  );
}
