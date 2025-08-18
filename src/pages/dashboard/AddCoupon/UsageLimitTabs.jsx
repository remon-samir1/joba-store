import React from 'react';

export function UsageLimitsTab({form , setForm}) {
  return (
    <div className="flex w-full flex-col items-start gap-8 px-6 py-6">
      {/* Usage Limit Per Coupon */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="w-full text-main-text text-[18px] font-medium">
          Usage limit per coupon
        </label>
        <div className="flex w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
          value={form.max_uses}
          onChange={(e)=>setForm({...form ,max_uses : e.target.value})}
            type="number"
            placeholder="Unlimited usage"
            className="flex-1 text-[18px] bg-transparent text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>

      {/* Usage Limit Per User */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="w-full text-main-text text-[18px] font-medium">
          Usage limit per user
        </label>
        <div className="flex bg-transparent w-full items-center px-4 py-4 border border-stroke rounded">
          <input
            type="number"
            value={form.max_uses_user}
          onChange={(e)=>setForm({...form ,max_uses_user : e.target.value})}

            placeholder="Unlimited usage"
            className="flex-1 text-[18px] text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
