import React, { useState } from 'react';

export function Settings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-black text-2xl font-semibold mb-8">About section</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-lg font-semibold">Profile</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-md">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.30597 2.72948H3.9558C2.51429 2.72948 1.3457 3.89806 1.3457 5.33958V14.04C1.3457 15.4815 2.51429 16.6501 3.9558 16.6501H12.6561C14.0977 16.6501 15.2662 15.4815 15.2662 14.04L15.2662 9.68978M5.69587 12.2998L8.86133 11.662C9.02938 11.6282 9.18367 11.5454 9.30485 11.4242L16.391 4.33409C16.7308 3.99416 16.7306 3.44315 16.3905 3.1035L14.8894 1.60409C14.5495 1.26458 13.9988 1.26481 13.6592 1.60461L6.57226 8.69542C6.45131 8.81643 6.36873 8.97041 6.33484 9.13811L5.69587 12.2998Z" stroke="#656565" strokeWidth="1.45006" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-md">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 24.3337C20.3056 24.3337 19.7153 24.0906 19.2292 23.6045C18.7431 23.1184 18.5 22.5281 18.5 21.8337C18.5 21.7364 18.5069 21.6357 18.5208 21.5316C18.5347 21.4274 18.5556 21.3337 18.5833 21.2503L12.7083 17.8337C12.4722 18.042 12.2083 18.2052 11.9167 18.3232C11.625 18.4413 11.3194 18.5003 11 18.5003C10.3056 18.5003 9.71528 18.2573 9.22917 17.7712C8.74306 17.285 8.5 16.6948 8.5 16.0003C8.5 15.3059 8.74306 14.7156 9.22917 14.2295C9.71528 13.7434 10.3056 13.5003 11 13.5003C11.3194 13.5003 11.625 13.5594 11.9167 13.6774C12.2083 13.7955 12.4722 13.9587 12.7083 14.167L18.5833 10.7503C18.5556 10.667 18.5347 10.5732 18.5208 10.4691C18.5069 10.3649 18.5 10.2642 18.5 10.167C18.5 9.47255 18.7431 8.88227 19.2292 8.39616C19.7153 7.91005 20.3056 7.66699 21 7.66699C21.6944 7.66699 22.2847 7.91005 22.7708 8.39616C23.2569 8.88227 23.5 9.47255 23.5 10.167C23.5 10.8614 23.2569 11.4517 22.7708 11.9378C22.2847 12.4239 21.6944 12.667 21 12.667C20.6806 12.667 20.375 12.608 20.0833 12.4899C19.7917 12.3719 19.5278 12.2087 19.2917 12.0003L13.4167 15.417C13.4444 15.5003 13.4653 15.5941 13.4792 15.6982C13.4931 15.8024 13.5 15.9031 13.5 16.0003C13.5 16.0975 13.4931 16.1982 13.4792 16.3024C13.4653 16.4066 13.4444 16.5003 13.4167 16.5837L19.2917 20.0003C19.5278 19.792 19.7917 19.6288 20.0833 19.5107C20.375 19.3927 20.6806 19.3337 21 19.3337C21.6944 19.3337 22.2847 19.5767 22.7708 20.0628C23.2569 20.5489 23.5 21.1392 23.5 21.8337C23.5 22.5281 23.2569 23.1184 22.7708 23.6045C22.2847 24.0906 21.6944 24.3337 21 24.3337Z" fill="#656565"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-black text-lg font-semibold mb-2">Wade Warren</h3>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">wade.warren@example.com</span>
                  <button className="p-1">
                    <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33203 10.4997H2.66536C2.31174 10.4997 1.9726 10.3592 1.72256 10.1091C1.47251 9.8591 1.33203 9.51996 1.33203 9.16634V3.16634C1.33203 2.81272 1.47251 2.47358 1.72256 2.22353C1.9726 1.97348 2.31174 1.83301 2.66536 1.83301H8.66536C9.01899 1.83301 9.35812 1.97348 9.60817 2.22353C9.85822 2.47358 9.9987 2.81272 9.9987 3.16634V3.83301M7.33203 6.49967H13.332C14.0684 6.49967 14.6654 7.09663 14.6654 7.83301V13.833C14.6654 14.5694 14.0684 15.1663 13.332 15.1663H7.33203C6.59565 15.1663 5.9987 14.5694 5.9987 13.833V7.83301C5.9987 7.09663 6.59565 6.49967 7.33203 6.49967Z" stroke="#6467F2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-lg font-semibold">Change Password</h2>
                <div className="flex items-center gap-1 text-blue-500 text-sm">
                  <span className="underline">Need help</span>
                  <svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 11.8333V11.8286M6.09155 6.5C6.34641 5.72722 7.10446 5.16667 7.99999 5.16667C9.10456 5.16667 9.99999 6.01946 9.99999 7.07143C9.99999 8.57063 8.38171 8.33596 8.05651 9.83333M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5Z" stroke="#6467F2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-black text-sm font-medium mb-3">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-blue-500 text-sm">
                  Forgot Current Password? Click here
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-3">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-black text-sm font-medium mb-3">Re-enter Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                  Save Change
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Update */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-black text-lg font-semibold">Profile Update</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.30597 2.72948H3.9558C2.51429 2.72948 1.3457 3.89806 1.3457 5.33958V14.04C1.3457 15.4815 2.51429 16.6501 3.9558 16.6501H12.6561C14.0977 16.6501 15.2662 15.4815 15.2662 14.04L15.2662 9.68978M5.69587 12.2998L8.86133 11.662C9.02938 11.6282 9.18367 11.5454 9.30485 11.4242L16.391 4.33409C16.7308 3.99416 16.7306 3.44315 16.3905 3.1035L14.8894 1.60409C14.5495 1.26458 13.9988 1.26481 13.6592 1.60461L6.57226 8.69542C6.45131 8.81643 6.36873 8.97041 6.33484 9.13811L5.69587 12.2998Z" stroke="#656565" strokeWidth="1.45006" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit
                </button>
              </div>

              {/* Profile Image Upload */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                    Upload New
                  </button>
                  <button className="border border-gray-300 text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">First Name</label>
                    <input
                      type="text"
                      placeholder="Wade"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Last Name</label>
                    <input
                      type="text"
                      placeholder="Warren"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="***********"
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361" stroke="#656565" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Phone Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="(406) 555-0120"
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400 pr-20"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 border-l border-gray-300 pl-3">
                        <svg width="20" height="14" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="24" rx="1.6" fill="#B12537"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M0 2.4H32V4.8H0V2.4ZM0 7.2H32V9.6H0V7.2ZM0 12H32V14.4H0V12ZM0 16.8H32V19.2H0V16.8Z" fill="white"/>
                          <rect width="12.8" height="12.8" fill="#3C3C6D"/>
                        </svg>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.83398 8.33301L10.0007 12.4997L14.1673 8.33301H5.83398Z" fill="#656565"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">E-mail</label>
                    <input
                      type="email"
                      placeholder="wade.warren@example.com"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Date of Birth</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="12- January- 1999"
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8327 3.33366H14.166V2.50033C14.166 2.27931 14.0782 2.06735 13.9219 1.91107C13.7657 1.75479 13.5537 1.66699 13.3327 1.66699C13.1117 1.66699 12.8997 1.75479 12.7434 1.91107C12.5871 2.06735 12.4993 2.27931 12.4993 2.50033V3.33366H7.49935V2.50033C7.49935 2.27931 7.41155 2.06735 7.25527 1.91107C7.09899 1.75479 6.88703 1.66699 6.66602 1.66699C6.445 1.66699 6.23304 1.75479 6.07676 1.91107C5.92048 2.06735 5.83268 2.27931 5.83268 2.50033V3.33366H4.16602C3.50297 3.33366 2.86709 3.59705 2.39825 4.06589C1.92941 4.53473 1.66602 5.17062 1.66602 5.83366V15.8337C1.66602 16.4967 1.92941 17.1326 2.39825 17.6014C2.86709 18.0703 3.50297 18.3337 4.16602 18.3337H15.8327C16.4957 18.3337 17.1316 18.0703 17.6004 17.6014C18.0693 17.1326 18.3327 16.4967 18.3327 15.8337V5.83366C18.3327 5.17062 18.0693 4.53473 17.6004 4.06589C17.1316 3.59705 16.4957 3.33366 15.8327 3.33366Z" fill="#656565"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-black text-sm font-medium mb-3">Location</label>
                  <input
                    type="text"
                    placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>

                {/* Biography Field */}
                <div>
                  <label className="block text-black text-sm font-medium mb-3">Biography</label>
                  <div className="relative">
                    <textarea
                      rows="4"
                      placeholder="Enter a biography about you"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 placeholder-gray-400 resize-none"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8H6C5.46957 8 4.96086 8.21071 4.58579 8.58579C4.21071 8.96086 4 9.46957 4 10V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V18" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 6.00011L19 9.00011M20.385 7.58511C20.7788 7.19126 21.0001 6.65709 21.0001 6.10011C21.0001 5.54312 20.7788 5.00895 20.385 4.61511C19.9912 4.22126 19.457 4 18.9 4C18.343 4 17.8088 4.22126 17.415 4.61511L9 13.0001V16.0001H12L20.385 7.58511Z" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0002 12.648L16.3702 10.278C16.6642 9.985 16.8102 9.838 16.8882 9.68C17.0382 9.38 17.0382 9.027 16.8882 8.726C16.8102 8.568 16.6642 8.422 16.3712 8.129C16.0782 7.836 15.9312 7.69 15.7742 7.612C15.626 7.5382 15.4627 7.49979 15.2972 7.49979C15.1317 7.49979 14.9684 7.5382 14.8202 7.612C14.6622 7.69 14.5152 7.836 14.2222 8.129L11.8522 10.5M14.0002 12.648L5.7782 20.871C5.4852 21.164 5.3382 21.31 5.1802 21.388C4.8802 21.538 4.5272 21.538 4.2262 21.388C4.0682 21.31 3.92221 21.164 3.6292 20.871C3.3362 20.578 3.19021 20.431 3.11221 20.274C3.03841 20.1258 3 19.9625 3 19.797C3 19.6315 3.03841 19.4682 3.11221 19.32C3.19021 19.162 3.3362 19.015 3.6292 18.722L11.8522 10.5M14.0002 12.648L11.8522 10.5" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
