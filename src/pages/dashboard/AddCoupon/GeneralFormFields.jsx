import { Select } from '@react-three/drei';
import React from 'react';

export function GeneralFormFields({setForm , form}) {
  return (
    <div className="flex w-full flex-col items-start gap-8 px-6 py-6">
      {/* Discount Type */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="w-full text-main-text text-[18px] font-medium">
          Discount type
        </label>
        <div className="flex w-full items-center justify-between px-4 py-4 border border-stroke rounded bg-white-color relative">
      <select value={form.type} required className='h-full w-full outline-none p-2 bg-transparent' onChange={(e)=>setForm({...form , type : e.target.value})}>
        <option value="percentage">Percentage</option>

        <option value="fixed">Fixed</option>
      </select>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.01298 9.01369L0.977087 3.18407C0.930537 3.11679 0.903277 3.03806 0.898261 2.9564C0.893246 2.87475 0.910664 2.79327 0.948629 2.7208C0.986595 2.64834 1.04366 2.58764 1.11365 2.54527C1.18364 2.50291 1.26389 2.4805 1.3457 2.48048H9.41748C9.49933 2.48042 9.57963 2.50277 9.64969 2.5451C9.71974 2.58743 9.77687 2.64812 9.81489 2.72061C9.85292 2.79309 9.87037 2.8746 9.86537 2.95629C9.86038 3.03799 9.83311 3.11676 9.78654 3.18407L5.75065 9.01369C5.7092 9.07308 5.65402 9.12158 5.58981 9.15507C5.52559 9.18857 5.45424 9.20605 5.38181 9.20605C5.30939 9.20605 5.23804 9.18857 5.17382 9.15507C5.10961 9.12158 5.05443 9.07308 5.01298 9.01369Z" fill="#1D1919"/>
          </svg>
        </div>
      </div>

      {/* Coupon Amount */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="w-full text-main-text text-[18px] font-medium">
          Coupon amount
        </label>
        <div className="flex w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
          onChange={(e)=>setForm({...form , value : e.target.value})}
            type="number"
            value={form.value}
            required
            placeholder="Fixed cart discount"
            className="flex-1 text-[18px] bg-transparent text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>

      {/* Coupon Expiry Date */}
      <div className="flex w-full flex-col items-start gap-2">
        <label className="w-full text-main-text text-[18px] font-medium">
          Coupon expiry date
        </label>
        <div className="flex w-full items-center px-4 py-4 border border-stroke rounded bg-white-color">
          <input
          onChange={(e)=>setForm({...form , expires_at : e.target.value})}
            type="date"
            value={form.expires_at}
            required
            placeholder="Fixed cart discount"
            className="flex-1 text-[18px] bg-transparent text-main-text placeholder:text-gray-placeholder border-0 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
