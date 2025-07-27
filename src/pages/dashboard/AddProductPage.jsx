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
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Upload, Plus, Calendar, X, Image as ImageIcon } from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Notifcation from "../../../components/Notification";

// Modern Loading Screen Component
const ModernLoadingScreen = () => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-24 h-24 rounded-full border-8 border-orange-500 border-t-transparent animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin-reverse"></div>
      </div>
    </div>
    <p className="mt-6 text-xl font-bold text-white animate-pulse">
      Adding product...
    </p>
    <p className="mt-2 text-orange-300">
      This may take a few moments
    </p>
  </div>
);

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
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
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

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
    if (productImages.length === 0) errors.push('Product Image');

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

  // Handlers for image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => 
      file.type.includes('image/jpeg') || 
      file.type.includes('image/png') ||
      file.type.includes('image/gif')
    );
    
    if (validImages.length === 0) {
      toast.error('Only image files (JPEG, PNG, GIF) are allowed');
      return;
    }
    
    if (validImages.length + productImages.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    
    setProductImages([...productImages, ...validImages]);
  };

  // Remove an image
  const removeImage = (index) => {
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);
    
    // Adjust current image index if needed
    if (index === currentImageIndex) {
      setCurrentImageIndex(newImages.length > 0 ? 0 : -1);
    } else if (index < currentImageIndex) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleSubmit = async (e, pending) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        toast.error(error);
      });
      setLoading(false);
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
    if (pending) {
      formData.append("status", "pending");
    }

    // Attachment (optional)
    if (attachment) {
      formData.append("attachment", attachment);
    }

    // Images
    productImages.forEach((img) => {
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
      await Axios.post("admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        toast.success("Product created successfully!");
        setTimeout(() => {
          nav(-1);
        }, 2000);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error("Failed to add product. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    Axios.get("/categories").then((data) => {
      setCategories(data.data.data.data);
    });
    Axios.get("/tags").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {loading && <ModernLoadingScreen />}
      <DashboardHeader title="Add Products" />
<Notifcation/>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search product for add"
              className="pl-10 w-80 border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Basic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="productName" className="text-gray-700">Product Name *</Label>
                  <Input
                    id="productName"
                    value={productData.productName}
                    onChange={handleChange}
                    placeholder="Product name"
                    className="mt-1 border-gray-300"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="productDescription" className="text-gray-700">
                    Product Description *
                  </Label>
                  <Textarea
                    id="productDescription"
                    value={productData.productDescription}
                    onChange={handleChange}
                    placeholder="Describe your product here..."
                    className="mt-1 min-h-32 border-gray-300"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="productPrice" className="text-gray-700">Product Price *</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={productData.productPrice}
                    onChange={handleChange}
                    placeholder="Price in EGP"
                    className="mt-1 border-gray-300"
                    required
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discountedPrice" className="text-gray-700">
                      Discounted Price (Optional)
                    </Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">EGP</span>
                      <Input
                        id="discountedPrice"
                        type="number"
                        value={productData.discountedPrice}
                        onChange={handleChange}
                        placeholder="Discounted price"
                        className="flex-1 border-gray-300"
                        min="0"
                      />
                      <span className="text-sm text-gray-500">Sales</span>
                      <Input
                        id="salesPrice"
                        type="number"
                        value={productData.salesPrice}
                        onChange={handleChange}
                        placeholder="Sales price"
                        className="flex-1 border-gray-300"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700">Tax Included *</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tax-yes"
                          checked={productData.taxIncluded === "yes"}
                          onCheckedChange={() =>
                            handleSelectChange("taxIncluded", "yes")
                          }
        
                          className="border-gray-300 data-[state=checked]:bg-orange-500"
                        />
                        <Label htmlFor="tax-yes" className="text-gray-700">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tax-no"
                          checked={productData.taxIncluded === "no"}
                          onCheckedChange={() =>
                            handleSelectChange("taxIncluded", "no")
                          }
                          className="border-gray-300 data-[state=checked]:bg-orange-500"
                        />
                        <Label htmlFor="tax-no" className="text-gray-700">No</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700">Expiration *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="relative">
                      <Input
                        id="expirationStart"
                        type="date"
                        value={productData.expirationStart}
                        onChange={handleChange}
                        className="border-gray-300"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Input
                        id="expirationEnd"
                        type="date"
                        value={productData.expirationEnd}
                        onChange={handleChange}
                        className="border-gray-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Variation weight and pricing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-10 gap-4 items-end">
                    <div className="col-span-4">
                      <Label className="text-gray-700">Variation weight *</Label>
                    </div>
                    <div className="col-span-4">
                      <Label className="text-gray-700">Variation Pricing *</Label>
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
                          className="border-gray-300"
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
                          className="border-gray-300"
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
                            className="text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariation}
                    className="w-full bg-orange-500 text-white hover:bg-orange-600 border-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add new variation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add Attachment */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Add attachment</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Label
                  htmlFor="attachment-file"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="mb-3">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <span className="text-gray-500 mb-3">
                    {attachment ? attachment.name : "File: PDF, DOCX etc."}
                  </span>
                  <input
                    id="attachment-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (
                          !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].some(
                            (type) => file.type.includes(type)
                          )
                        ) {
                          toast.error(
                            "Invalid file type. Allowed types: PDF, DOC, DOCX"
                          );
                          return;
                        }
                        setAttachment(file);
                      }
                    }}
                    accept=".pdf,.doc,.docx"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-orange-500 text-white hover:bg-orange-600 border-none"
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
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stockQuantity" className="text-gray-700">
                      Stock Quantity {!productData.unlimitedStock && "*"}
                    </Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={productData.stockQuantity}
                      onChange={handleChange}
                      placeholder="100"
                      className="mt-1 border-gray-300"
                      disabled={productData.unlimitedStock}
                      required={!productData.unlimitedStock}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockStatus" className="text-gray-700">Stock Status *</Label>
                    <Select
                      value={productData.stockStatus}
                      onValueChange={(value) =>
                        handleSelectChange("stockStatus", value)
                      }
                      required
                    >
                      <SelectTrigger className="mt-1 border-gray-300" id="stockStatus">
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
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <Label htmlFor="unlimitedStock" className="text-gray-700">Unlimited Stock</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isBestSeller"
                      checked={productData.isBestSeller}
                      onCheckedChange={(checked) =>
                        handleCheckedChange("isBestSeller", checked)
                      }
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                    <Label htmlFor="isBestSeller" className="text-gray-700">
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
                      className="border-gray-300 data-[state=checked]:bg-orange-500"
                    />
                    <Label htmlFor="isNewArrival" className="text-gray-700">
                      Highlight this product in a new arrivals section.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={(e) => handleSubmit(e, true)}
                variant="outline"
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600 border-none"
              >
                Save to draft
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 border-none"
              >
                Add Product
              </Button>
            </div>
          </div>

          {/* Right Column - Product Images and Categories */}
          <div className="space-y-6">
            {/* Upload Product Images */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Upload Product Images *</CardTitle>
                <p className="text-sm text-gray-500">
                  Add multiple images (Required)
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Main Image Preview */}
                <div className="relative w-full h-64 rounded-lg border border-dashed border-gray-300 overflow-hidden bg-gray-100">
                  {productImages.length > 0 ? (
                    <>
                      <img
                        src={URL.createObjectURL(
                          productImages[currentImageIndex]
                        )}
                        alt={`Product Preview ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        onClick={() => removeImage(currentImageIndex)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">No images selected</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Previews */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer border-2 rounded ${
                        index === currentImageIndex
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Upload Button */}
                <div className="mt-4">
                  <Label
                    htmlFor="product-images-upload"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer block"
                  >
                    <input
                      id="product-images-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="productCategory" className="text-gray-700">Product Categories *</Label>
                  <Select
                    value={productData.productCategory}
                    onValueChange={(value) =>
                      handleSelectChange("productCategory", value)
                    }
                    required
                  >
                    <SelectTrigger className="mt-1 border-gray-300" id="productCategory">
                      <SelectValue placeholder="Select your product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((data) => (
                        <SelectItem key={data.id} value={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="productTag" className="text-gray-700">Product Tag *</Label>
                  <Select
                    value={productData.productTag}
                    onValueChange={(value) =>
                      handleSelectChange("productTag", value)
                    }
                    required
                  >
                    <SelectTrigger className="mt-1 border-gray-300" id="productTag">
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