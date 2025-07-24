
import { useEffect, useState } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import axios from "axios";
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
import Notifcation from "../../../components/Notification";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const [loading , setLoading] = useState(false)
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
  const [formError, setFormError] = useState(null);

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
  };

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

  // Validate form before submission
  const validateForm = () => {
    const errors = [];

    // Required fields validation
    if (!productData.productName.trim()) errors.push('Product Name');
    if (!productData.productDescription.trim()) errors.push('Product Description');
    if (!productData.productPrice) errors.push('Product Price');
    if (!productData.expirationStart) errors.push('Expiration Start Date');
    if (!productData.expirationEnd) errors.push('Expiration End Date');
    if (!productData.stockQuantity && !productData.unlimitedStock) errors.push('Stock Quantity');
    if (!productData.productCategory) errors.push('Product Category');
    if (!productData.productTag) errors.push('Product Tag');
    
    // Product image validation
    if (!productImage) errors.push('Product Image');

    // Variations validation
    let variationErrors = [];
    variations.forEach((variation, index) => {
      if (!variation.weight.trim()) variationErrors.push(`Variation ${index + 1} weight`);
      if (!variation.price) variationErrors.push(`Variation ${index + 1} price`);
    });
    
    if (variationErrors.length > 0) errors.push(...variationErrors);
    
    // Expiration date validation
    if (productData.expirationStart && productData.expirationEnd) {
      const startDate = new Date(productData.expirationStart);
      const endDate = new Date(productData.expirationEnd);
      
      if (startDate >= endDate) {
        errors.push('Expiration End Date must be after Start Date');
      }
    }

    return errors;
  };

  // Handlers for file uploads with type restrictions
  const handleFileChange = (e, setter, allowedTypes) => {
    const file = e.target.files[0];
    
    if (file) {
      if (allowedTypes && !allowedTypes.some(type => file.type.includes(type))) {
        const allowedTypesStr = allowedTypes.map(t => t.split('/')[1]).join(', ');
        alert(`Invalid file type. Allowed types: ${allowedTypesStr}`);
        return;
      }
      
      setter(file);
    }
  };

  const handleSubmit = async (e , pending) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true)
    // Validate form
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      setFormError(`Please fill in all required fields:\n- ${validationErrors.join('\n- ')}`);
      return;
    }

    const formData = new FormData();

    // Basic fields
    formData.append("name", productData.productName);
    formData.append("description", productData.productDescription);
    formData.append("price", productData.productPrice);
    formData.append("payment_method", "visa");
    formData.append("stock", productData.stockQuantity);
    formData.append("category_id", productData.productCategory);
    formData.append("is_featured", productData.isBestSeller ? 1 : 0);
    if(pending){

      formData.append("status", "pending");
    }

    // Attachment (optional)
    if (attachment) {
      formData.append("attachment", attachment);
    }

    // Images
    formData.append("images[]", productImage);
    additionalImages.forEach((img) => {
      formData.append("images[]", img);
    });

    // Variations
    variations.forEach((v, i) => {
      formData.append(`sizes[${i}][name]`, v.weight);
      formData.append(`sizes[${i}][price]`, v.price);
      formData.append(`sizes[${i}][stock]`, productData.stockQuantity);
    });

    // Tags
    if (productData.productTag) {
      formData.append("tags[]", productData.productTag);
    }

    try {
      const res = await Axios.post("admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(()=>{
  toast.success('product Created Successfly')
        setLoading(false)
      })
      console.log("✅ Product added successfully", res.data);
      // Reset form after successful submission
      setProductData({
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
      setVariations([{ weight: "", price: "" }]);
      setAttachment(null);
      setProductImage(null);
      setAdditionalImages([]);
      
      // Show success notification
      Notifcation.showSuccess("Product added successfully!");
      
    } catch (error) {
      console.error("❌ Error submitting form:", error.response?.data || error);
      setFormError("Failed to add product. Please try again.");
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    Axios.get("/categories").then((data) => {
      setCategories(data.data.data.data);
    });
    Axios.get("/tags").then((data) => {
      // setCategories(data.data.data.data);
      console.log(data);
    });

  }, []);

  return (
    <div className="flex-1">
      {
        loading && <Loading/>
      }
      <DashboardHeader title="Add Products" />
      <Notifcation />

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

        {/* Form error message */}
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{formError}</span>
          </div>
        )}

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
                  <Label htmlFor="productName">Product Name *</Label>
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
                  <Label htmlFor="productDescription">
                    Product Description *
                  </Label>
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
                  <Label htmlFor="productPrice">Product Price *</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={productData.productPrice}
                    onChange={handleChange}
                    placeholder="EGP 999.89"
                    className="mt-1"
                    required
                    min="0"
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
                        min="0"
                      />
                      <span className="text-sm text-gray-500">Sales</span>
                      <Input
                        id="salesPrice"
                        type="number"
                        value={productData.salesPrice}
                        onChange={handleChange}
                        placeholder="EGP 900.89"
                        className="flex-1"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Tax Included *</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tax-yes"
                          checked={productData.taxIncluded === "yes"}
                          onCheckedChange={() =>
                            handleSelectChange("taxIncluded", "yes")
                          }
                          required
                        />
                        <Label htmlFor="tax-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tax-no"
                          checked={productData.taxIncluded === "no"}
                          onCheckedChange={() =>
                            handleSelectChange("taxIncluded", "no")
                          }
                        />
                        <Label htmlFor="tax-no">No</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Expiration *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="relative">
                      <Input
                        id="expirationStart"
                        type="date"
                        value={productData.expirationStart}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Input
                        id="expirationEnd"
                        type="date"
                        value={productData.expirationEnd}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Variation weight and pricing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-10 gap-4 items-end">
                    <div className="col-span-4">
                      <Label>Variation weight *</Label>
                    </div>
                    <div className="col-span-4">
                      <Label>Variation Pricing *</Label>
                    </div>
                    <div className="col-span-2"></div>
                  </div>

                  {variations.map((variation, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-10 gap-4 items-center"
                    >
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
                          min="0"
                        />
                      </div>
                      <div className="col-span-2">
                        {variations.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariation(index)}
                          >
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
                <Label
                  htmlFor="attachment-file"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block"
                >
                  <input
                    id="attachment-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setAttachment, [
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ])}
                    accept=".pdf,.doc,.docx"
                  />
                  <span className="text-gray-500">
                    {attachment ? attachment.name : "File: PDF, DOCX etc."}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-4 bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() =>
                      document.getElementById("attachment-file").click()
                    }
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
                    <Label htmlFor="stockQuantity">
                      Stock Quantity {!productData.unlimitedStock && '*'}
                    </Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={productData.stockQuantity}
                      onChange={handleChange}
                      placeholder="100"
                      className="mt-1"
                      disabled={productData.unlimitedStock}
                      required={!productData.unlimitedStock}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockStatus">Stock Status *</Label>
                    <Select
                      value={productData.stockStatus}
                      onValueChange={(value) =>
                        handleSelectChange("stockStatus", value)
                      }
                      required
                    >
                      <SelectTrigger className="mt-1" id="stockStatus">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">
                          Out of Stock
                        </SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="unlimitedStock"
                    checked={productData.unlimitedStock}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("unlimitedStock", checked)
                    }
                  />
                  <Label htmlFor="unlimitedStock">Unlimited Stock</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isBestSeller"
                      checked={productData.isBestSeller}
                      onCheckedChange={(checked) =>
                        handleCheckedChange("isBestSeller", checked)
                      }
                    />
                    <Label htmlFor="isBestSeller">
                      Highlight this product in a best seller section.
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isNewArrival"
                      checked={productData.isNewArrival}
                      onCheckedChange={(checked) =>
                        handleCheckedChange("isNewArrival", checked)
                      }
                    />
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
               onClick={(e)=>handleSubmit(e, true)}
                
                variant="outline"
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              >
                Save to draft
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Add Product
              </Button>
            </div>
          </div>

          {/* Right Column - Product Image and Categories */}
          <div className="space-y-6">
            {/* Upload Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Product Image *</CardTitle>
                <p className="text-sm text-gray-500">
                  Main Product Image (Required)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label
                  htmlFor="product-image-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block"
                >
                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setProductImage, ["image"])}
                    required
                  />
                  <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    {productImage ? (
                      <img
                        src={URL.createObjectURL(productImage)}
                        alt="Product Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-500">Product Image</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("product-image-upload").click();
                    }}
                  >
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
                  <Label htmlFor="productCategory">Product Categories *</Label>
                  <Select
                    value={productData.productCategory}
                    onValueChange={(value) =>
                      handleSelectChange("productCategory", value)
                    }
                    required
                  >
                    <SelectTrigger className="mt-1" id="productCategory">
                      <SelectValue placeholder="Select your product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((data) => (
                        <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="productTag">Product Tag *</Label>
                  <Select
                    value={productData.productTag}
                    onValueChange={(value) =>
                      handleSelectChange("productTag", value)
                    }
                    required
                  >
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
