import React from 'react';

export function InvoiceDetails() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Invoice Details</h1>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 md:p-8">
          {/* Invoice Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Customer Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 text-base font-medium">Order date :</span>
                  <span className="text-gray-600 text-base font-medium">01-01-2025</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 text-base font-medium">Name :</span>
                  <span className="text-gray-600 text-base font-medium">John Doe</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 text-base font-medium">Phone number :</span>
                  <span className="text-gray-600 text-base font-medium">(484) 817-2760 x305</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 text-base font-medium">Email :</span>
                  <span className="text-gray-600 text-base font-medium break-all">John_Doe_2025@hotmail.com</span>
                </div>
                
                <div className="md:col-span-2 flex justify-between items-start">
                  <span className="text-gray-900 text-base font-medium flex-shrink-0">Address :</span>
                  <span className="text-gray-600 text-base font-medium text-right ml-4">
                    681 W Walnut Street, New Juniorton 90516
                  </span>
                </div>
                
                {/* Payment Status */}
                <div className="md:col-span-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <span className="text-gray-900 text-base font-medium">Payment Status :</span>
                  <div className="relative w-full sm:w-48">
                    <select className="bg-gray-50 border border-gray-300 rounded px-4 py-3 text-gray-900 text-sm font-medium appearance-none pr-10 w-full">
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1663 8.33301L9.99967 12.4997L5.83301 8.33301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order ID */}
            <div className="flex lg:justify-end">
              <div className="bg-gray-50 rounded-lg px-5 py-4 border border-gray-200">
                <span className="text-gray-900 text-lg font-semibold">Order ID: #CUST001</span>
              </div>
            </div>
          </div>

          {/* Invoice Items Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Premium Widget</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">2</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $49.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $99.98
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Basic Service Package</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">1</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $149.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $149.00
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Extended Warranty</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">1</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $29.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      $29.99
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 mb-8 overflow-hidden">
            {/* Subtotal */}
            <div className="flex justify-between items-center h-16 px-6 border-b border-gray-200">
              <span className="text-gray-700 text-sm font-medium">Subtotal</span>
              <span className="text-gray-900 text-base font-semibold">$278.97</span>
            </div>

            {/* Shipping Fee */}
            <div className="flex justify-between items-center h-16 px-6 border-b border-gray-200">
              <span className="text-gray-700 text-sm font-medium">Shipping fee</span>
              <span className="text-gray-900 text-base font-semibold">$15.00</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between items-center h-16 px-6 border-b border-gray-200">
              <span className="text-gray-700 text-sm font-medium">Discount</span>
              <span className="text-green-600 text-base font-semibold">-$20.00</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center h-16 px-6">
              <span className="text-gray-900 text-base font-semibold">Total</span>
              <span className="text-gray-900 text-xl font-bold">$273.97</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg text-base font-semibold hover:bg-orange-600 transition-colors shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Invoice
            </button>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg text-base font-semibold hover:bg-blue-800 transition-colors shadow-md">
              <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5001 8.61621V5.61621H8.50015V8.61621H7.50015V4.61621H17.5001V8.61621H16.5001ZM18.1151 12.1162C18.3985 12.1162 18.6361 12.0202 18.8281 11.8282C19.0201 11.6362 19.1158 11.3989 19.1151 11.1162C19.1145 10.8335 19.0188 10.5959 18.8281 10.4032C18.6375 10.2105 18.3998 10.1145 18.1151 10.1152C17.8305 10.1159 17.5931 10.2119 17.4031 10.4032C17.2131 10.5945 17.1171 10.8322 17.1151 11.1162C17.1131 11.4002 17.2091 11.6375 17.4031 11.8282C17.5971 12.0189 17.8338 12.1149 18.1151 12.1162ZM16.5001 19.0002V14.4622H8.50015V19.0002H16.5001ZM17.5001 20.0002H7.50015V16.0002H4.07715V10.6162C4.07715 10.0495 4.26948 9.57454 4.65415 9.19121C5.03882 8.80788 5.51315 8.61588 6.07715 8.61521H18.9231C19.4898 8.61521 19.9648 8.80721 20.3481 9.19121C20.7315 9.57521 20.9231 10.0499 20.9231 10.6152V16.0002H17.5001V20.0002ZM19.9231 15.0002V10.6162C19.9231 10.3329 19.8275 10.0952 19.6361 9.90321C19.4448 9.71121 19.2071 9.61521 18.9231 9.61521H6.07715C5.79382 9.61521 5.55648 9.71121 5.36515 9.90321C5.17382 10.0952 5.07782 10.3329 5.07715 10.6162V15.0002H7.50015V13.4622H17.5001V15.0002H19.9231Z" fill="white"/>
              </svg>
              Print Invoice
            </button>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}