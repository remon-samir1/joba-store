import React from 'react';

export function UsageRestrictionTab({form , setForm}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-6 py-6">
      {/* Minimum Spend */}
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="w-full text-main-text text-[18px] font-medium">
          Minimum spend
        </label>
        <div className="flex h-14 w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
     required
            type="number"
            placeholder="No minimum"
            value={form.min_purchase}
            onChange={(e)=>setForm({...form , min_purchase : e.target.value})}
            className="flex-1  bg-transparent text-[16px] text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>

      {/* Maximum */}
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="w-full text-main-text text-[18px] font-medium">
          Maximum
        </label>
        <div className="flex h-14 w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
            type="number"
            required
            placeholder="No maximum"
            value={form.max_purchase}

            onChange={(e)=>setForm({...form , max_purchase : e.target.value})}
            className="flex-1 text-[16px] bg-transparent  text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>

      {/* <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-[632px] flex-col items-start gap-4">
          <h3 className="w-full text-main-text text-[18px] font-medium">
            Individual use only
          </h3>
          <div className="flex items-center gap-2 w-full">
            <div className="w-5 h-5 border-[1.468px] border-stroke rounded-sm"></div>
            <span className="text-main-text text-[16px] font-normal">
              Check this box if the coupon cannot be used in conjunction with other coupons.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 w-full">
          <h3 className="w-full text-main-text text-[18px] font-medium">
            Exclude sale items
          </h3>
          <div className="flex items-start gap-2 w-full">
            <div className="w-5 h-5 border-[1.468px] border-stroke rounded-sm mt-0.5"></div>
            <span className="w-[827px] text-main-text text-[16px] font-normal leading-[160%]">
              Check this box if the coupon should not apply to items on sale. Per-item coupons will only work if the item is not on sale. Per-cart coupons will only work if there are items in the cart that are not on sale.
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        <label className="w-full text-main-text text-[18px] font-medium">
          Products
        </label>
        <div className="flex w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
            type="text"
            placeholder="products"
            className="flex-1 text-[18px] text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div> */}
    </div>
  );
}
