
import { useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import axios from 'axios'
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Upload, Plus, Calendar, X } from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    discountedPrice: "",
    salesPrice: "",
    taxIncluded: "yes",
    expirationStart: "",
    expirationEnd: "",
    stockQuantity: "",
    stockStatus: "in-stock",
    unlimitedStock: false,
    isBestSeller: false,
    isNewArrival: false,
    productCategory: "",
    productTag: "",
  });

  const [variations, setVariations] = useState([{ weight: "", price: "" }]);
  const [attachment, setAttachment] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // Generic handler for text inputs and textareas
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler for Checkboxes
  const handleCheckedChange = (id, checked) => {
    setProductData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };
  
  // Handler for Switches
  const handleSwitchChange = (id, checked) => {
    setProductData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };
  
  // Handler for Select components
  const handleSelectChange = (id, value) => {
     setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  // Handlers for variations
  const handleVariationChange = (index, event) => {
    const values = [...variations];
    values[index][event.target.name] = event.target.value;
    setVariations(values);
  };

  const addVariation = () => {
    setVariations([...variations, { weight: "", price: "" }]);
  };

  const removeVariation = (index) => {
    const values = [...variations];
    values.splice(index, 1);
    setVariations(values);
  };

  // Handlers for file uploads
  const handleFileChange = (e, setter) => {
      const file = e.target.files[0];
      if (file) {
          setter(file);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // 🟩 Basic fields
    formData.append('name', productData.productName);
    // formData.append('product_type_id', "T-shirts");
    formData.append('description', productData.productDescription);
    formData.append('price', productData.productPrice);
    formData.append('payment_method', 'visa');
    formData.append('stock', productData.stockQuantity);
    formData.append('category_id', productData.productCategory); 
    // formData.append('product_type_id', productData.productTag); 
    formData.append('is_featured', productData.isBestSeller ? 1 : 0);
  
    // 🟨 Status - You might use 'pending' by default
    formData.append('status', 'pending');
  
    // 🗂️ Attachment
    if (attachment) {
      formData.append('attachment', attachment);
    }
  
    // 🖼️ Images
    if (productImage) {
      formData.append('images[]', productImage);
    }
    additionalImages.forEach((img) => {
      formData.append('images[]', img);
    });
  
    // 📦 Sizes (aka variations)
    variations.forEach((v, i) => {
      formData.append(`sizes[${i}][name]`, v.weight); // 👈 هنا الوزن اسمه "name"
      formData.append(`sizes[${i}][price]`, v.price);
      formData.append(`sizes[${i}][stock]`, productData.stockQuantity); // أو ممكن تضيف لكل variation stock منفصل
    });
  
    // 🏷️ Tags
    if (productData.productTag) {
      formData.append('tags[]', productData.productTag);
    }
  
    try {
      const res = await Axios.post(
        'admin/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("✅ Product added successfully", res.data);
    } catch (error) {
      console.error("❌ Error submitting form:", error.response?.data || error);
    }
  };
  
const [categories , setCategories] = useState([])
useEffect(()=>{
  Axios.get('/categories').then(data=>{
    console.log(data.data.data.data);
    setCategories(data.data.data.data)
  })
},[])
  return (
    <div className="flex-1 overflow-auto h-max">
      <DashboardHeader title="Add Products" />

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search product for add"
              className="pl-10 w-80"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productData.productName}
                    onChange={handleChange}
                    placeholder="Seasonal Allergies"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="productDescription">Product Description</Label>
                  <Textarea
                    id="productDescription"
                    value={productData.productDescription}
                    onChange={handleChange}
                    placeholder="Describe your product here..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productPrice">Product Price</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={productData.productPrice}
                    onChange={handleChange}
                    placeholder="EGP 999.89"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discountedPrice">
                      Discounted Price (Optional)
                    </Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">EGP</span>
                      <Input
                        id="discountedPrice"
                        type="number"
                        value={productData.discountedPrice}
                        onChange={handleChange}
                        placeholder="999.89"
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500">Sales</span>
                      <Input
                        id="salesPrice"
                        type="number"
                        value={productData.salesPrice}
                        onChange={handleChange}
                        placeholder="EGP 900.89"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Tax Included</Label>
                    <div className="flex items-center space-x-4 mt-2">
                       <div className="flex items-center space-x-2">
                         <Checkbox id="tax-yes" checked={productData.taxIncluded === 'yes'} onCheckedChange={() => handleSelectChange('taxIncluded', 'yes')} />
                         <Label htmlFor="tax-yes">Yes</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                         <Checkbox id="tax-no" checked={productData.taxIncluded === 'no'} onCheckedChange={() => handleSelectChange('taxIncluded', 'no')} />
                         <Label htmlFor="tax-no">No</Label>
                       </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Expiration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="relative">
                      <Input id="expirationStart" type="date" value={productData.expirationStart} onChange={handleChange} required />
                    </div>
                    <div className="relative">
                      <Input id="expirationEnd" type="date" value={productData.expirationEnd} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                {/* Variation weight and pricing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-10 gap-4 items-end">
                    <div className="col-span-4"><Label>Variation weight</Label></div>
                    <div className="col-span-4"><Label>Variation Pricing</Label></div>
                    <div className="col-span-2"></div>
                  </div>

                  {variations.map((variation, index) => (
                    <div key={index} className="grid grid-cols-10 gap-4 items-center">
                      <div className="col-span-4">
                        <Input
                          name="weight"
                          placeholder="e.g., 10kg"
                          value={variation.weight}
                          onChange={(e) => handleVariationChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          name="price"
                          type="number"
                          placeholder="e.g., EGP 350"
                          value={variation.price}
                          onChange={(e) => handleVariationChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        {variations.length > 1 && (
                           <Button variant="ghost" size="icon" onClick={() => removeVariation(index)}>
                             <X className="h-4 w-4 text-red-500" />
                           </Button>
                        )}
                      </div>
                    </div>
                   ))}


                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariation}
                    className="w-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add new variation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Attachment */}
            <Card>
                <CardHeader>
                    <CardTitle>Add attachment</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="attachment-file" className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block">
                        <input id="attachment-file" type="file" className="hidden" onChange={(e) => handleFileChange(e, setAttachment)} />
                        <span className="text-gray-500">{attachment ? attachment.name : "File: PDF, DOCX etc."}</span>
                        <Button
                            type="button"
                            variant="outline"
                            className="ml-4 bg-orange-500 text-white hover:bg-orange-600"
                            onClick={() => document.getElementById('attachment-file').click()}
                        >
                            Choose file
                        </Button>
                    </Label>
                </CardContent>
            </Card>


            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={productData.stockQuantity}
                      onChange={handleChange}
                      placeholder="100"
                      className="mt-1"
                      disabled={productData.unlimitedStock}
                      required={!productData.unlimitedStock}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockStatus">Stock Status</Label>
                    <Select value={productData.stockStatus} onValueChange={(value) => handleSelectChange('stockStatus', value)} required>
                      <SelectTrigger className="mt-1" id="stockStatus">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="unlimitedStock" checked={productData.unlimitedStock} onCheckedChange={(checked) => handleSwitchChange('unlimitedStock', checked)} />
                  <Label htmlFor="unlimitedStock">Unlimited Stock</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isBestSeller" checked={productData.isBestSeller} onCheckedChange={(checked) => handleCheckedChange('isBestSeller', checked)} />
                    <Label htmlFor="isBestSeller">
                      Highlight this product in a best seller section.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isNewArrival" checked={productData.isNewArrival} onCheckedChange={(checked) => handleCheckedChange('isNewArrival', checked)} />
                    <Label htmlFor="isNewArrival">
                      Highlight this product in a new arrivals section.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              >
                Save to draft
              </Button>
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                Update Product
              </Button>
            </div>
          </div>

          {/* Right Column - Product Image and Categories */}
          <div className="space-y-6">
            {/* Upload Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Product Image</CardTitle>
                <p className="text-sm text-gray-500">Main Product Image (Required)</p>
              </CardHeader>
              <CardContent className="space-y-4">
                 <Label htmlFor="product-image-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block">
                    <input id="product-image-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, setProductImage)} required/>
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        {productImage ? <img src={URL.createObjectURL(productImage)} alt="Product Preview" className="h-full w-full object-cover rounded-lg" /> : <span className="text-gray-500">Product Image</span>}
                    </div>
                     <Button type="button" variant="outline" size="sm" onClick={(e) => { e.preventDefault(); document.getElementById('product-image-upload').click(); }}>
                        <Upload className="h-4 w-4 mr-2" />
                        {productImage ? "Replace" : "Browse"}
                    </Button>
                 </Label>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="productCategory">Product Categories</Label>
                   <Select value={productData.productCategory} onValueChange={(value) => handleSelectChange('productCategory', value)} required>
                      <SelectTrigger className="mt-1" id="productCategory">
                        <SelectValue placeholder="Select your product category" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories?.map((data)=>(

                            <SelectItem value={data.id}>{data.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                </div>

                <div>
                  <Label htmlFor="productTag">Product Tag</Label>
                    <Select value={productData.productTag} onValueChange={(value) => handleSelectChange('productTag', value)} required>
                      <SelectTrigger className="mt-1" id="productTag">
                        <SelectValue placeholder="Select your product tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bestseller">Bestseller</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

