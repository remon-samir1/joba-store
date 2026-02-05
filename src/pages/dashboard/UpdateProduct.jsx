import React, { useEffect, useState } from "react";
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
import {
  Search,
  Upload,
  Plus,
  Calendar,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Notifcation from "../../../components/Notification";

// Modern loading screen
const ModernLoadingScreen = () => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-24 h-24 rounded-full border-8 border-orange-500 border-t-transparent animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin-reverse"></div>
      </div>
    </div>
    <p className="mt-6 text-xl font-bold text-white animate-pulse">
      Updating product...
    </p>
    <p className="mt-2 text-orange-300">Please wait a moment</p>
  </div>
);

export default function UpdateProduct() {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    productNameAr: "", // Added Arabic name
    productDescription: "",
    productDescriptionAr: "", // Added Arabic description
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
    productCategory: 0,
    productTag: "",
  });

  const { id } = useParams();
  const [variations, setVariations] = useState([{ weight: "", price: "" }]);
  const [attachment, setAttachment] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product data
        const productsRes = await Axios.get(`/products/${id}`);
        console.log("Product Response:", productsRes);
        const product = productsRes.data?.data || productsRes.data;
        if (!product) throw new Error("Product data not found");

        setInitialData(product);
        // console.log(product);
        // Set product data
        setProductData({
          productName: product.name?.en || "",
          productNameAr: product.name?.ar || "", // Map Arabic name
          productDescription: product.description?.en || "",
          productDescriptionAr: product.description?.ar || "", // Map Arabic description
          productPrice: product.price || "",
          discountedPrice: +product.discount_price,
          salesPrice: product.sales_price || "",
          taxIncluded: product.tax_included ? "yes" : "no",
          expirationStart: product.created_at || "",
          expirationEnd: product.expiration_end || "",
          stockQuantity: product.stock ?? "",
          stockStatus: product.stock === 0 ? "out_of_stock" : "in_stock",
          // unlimitedStock: product.stock ,
          isBestSeller: product.is_featured || false,
          isNewArrival: product.is_new_arrival || false,
          productCategory: product.category_id,
          productTag: product.tags?.[0] || "",
        });

        // Set variations
        setVariations(
          product.sizes?.length
            ? product.sizes.map((s) => ({
                id: s.id,
                weight: s.name,
                price: s.price,
              }))
            : [{ weight: "", price: "" }],
        );

        // Set images
        if (product.images && product.images.length > 0) {
          setProductImages(
            product.images.map((url) => ({ url, isExisting: true })),
          );
        } else if (product.image) {
          setProductImages([{ url: product.image, isExisting: true }]);
        }

        // Set attachment
        if (product.attachment_path) {
          setAttachment({ url: product.attachment_path, isExisting: true });
        }

        // Fetch categories and tags
        const categoriesRes = await Axios.get("/categories");
        setCategories(
          categoriesRes.data?.data?.data ||
            categoriesRes.data?.data ||
            categoriesRes.data ||
            [],
        );

        const tagsRes = await Axios.get("/tags");
        setTags(tagsRes.data?.data || tagsRes.data || []);

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Generic handler for text inputs and textareas
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler for Checkboxes
  const handleCheckedChange = (id, checked) => {
    setProductData((prev) => ({ ...prev, [id]: checked }));
  };

  // Handler for Switches
  const handleSwitchChange = (id, checked) => {
    setProductData((prev) => ({ ...prev, [id]: checked }));
  };

  // Handler for Select components
  const handleSelectChange = (id, value) => {
    setProductData((prev) => ({ ...prev, [id]: value }));
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

  // Handlers for image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length === 0) {
      toast.error("Only image files are allowed");
      return;
    }

    if (validImages.length + productImages.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    const newImages = validImages.map((file) => ({ file, isExisting: false }));
    setProductImages([...productImages, ...newImages]);
  };

  // Remove an image
  const removeImage = (index) => {
    const newImages = [...productImages];
    newImages.splice(index, 1);
    setProductImages(newImages);

    if (index === currentImageIndex) {
      setCurrentImageIndex(newImages.length > 0 ? 0 : -1);
    } else if (index < currentImageIndex) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Handle attachment upload
  const handleAttachmentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAttachment({ file, isExisting: false });
  };

  const handleSubmit = async (e, pending = false) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    const errors = [];

    // Required fields
    if (!productData.productName.trim())
      errors.push("Product Name is required");
    if (!productData.productDescription.trim())
      errors.push("Product Description is required");
    if (!productData.productPrice) errors.push("Product Price is required");
    // if (!productData.productCategory) errors.push('Product Category is required');
    if (!productData.productTag) errors.push("Product Tag is required");

    // Variations validation
    variations.forEach((variation, index) => {
      if (!variation.weight.trim())
        errors.push(`Variation ${index + 1} weight is required`);
      if (!variation.price)
        errors.push(`Variation ${index + 1} price is required`);
    });

    // Expiration date validation
    // if (productData.expirationStart && productData.expirationEnd) {
    //   const startDate = new Date(productData.expirationStart);
    //   const endDate = new Date(productData.expirationEnd);

    //   if (startDate >= endDate) {
    //     errors.push("Expiration End Date must be after Start Date");
    //   }
    // }

    // Show errors
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PUT");

    // Basic fields
    formData.append("name[en]", productData.productName);
    formData.append("name[ar]", productData.productNameAr);
    formData.append("description[en]", productData.productDescription);
    formData.append("description[ar]", productData.productDescriptionAr);
    formData.append("price", productData.productPrice);

    formData.append("discount_price", productData.discountedPrice);
    formData.append("sales_price", productData.salesPrice);
    // formData.append(
    //   "tax_included",
    //   productData.taxIncluded === "yes" ? "1" : "0",
    // );
    // formData.append("expiration_start", productData.expirationStart);
    // formData.append("expiration_end", productData.expirationEnd);
    formData.append(
      "stock",
      productData.stockStatus === "out_of_stock"
        ? 0
        : productData.stockQuantity,
    );
    // formData.append(
    //   "is_out_of_stock",
    //   productData.stockStatus === "out-of-stock" ? "1" : "0",
    // );
    // formData.append("unlimited_stock", productData.unlimitedStock ? "1" : "0");
    formData.append("is_featured", productData.isBestSeller ? "1" : "0");
    formData.append("is_new_arrival", productData.isNewArrival ? "1" : "0");
    formData.append("category_id", productData.productCategory);
    formData.append("tags[]", productData.productTag);

    if (pending) {
      formData.append("status", "pending");
    }

    // Attachment
    if (attachment && !attachment.isExisting && attachment.file) {
      formData.append("attachment", attachment.file);
    } else if (!attachment && initialData?.attachment_path) {
      formData.append("remove_attachment", "1");
    }

    // Images
    productImages.forEach((img) => {
      if (!img.isExisting && img.file) {
        formData.append("images[]", img.file);
      }
    });

    // Variations
    variations.forEach((v, i) => {
      if (v.id) {
        formData.append(`sizes[${i}][id]`, v.id);
      }
      formData.append(`sizes[${i}][name]`, v.weight);
      formData.append(`sizes[${i}][price]`, v.price);
      formData.append(
        `sizes[${i}][stock]`,
        productData.stockStatus === "out_of_stock"
          ? 0
          : productData.stockQuantity,
      );
    });
    // formData.append("sizes", JSON.stringify(variations));

    try {
      await Axios.post(`/admin/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1500);
    } catch (error) {
      if (error.response) {
        const { message, errors } = error.response.data;

        if (!errors) {
          toast.error(message);
        }

        if (errors) {
          Object.values(errors).forEach((fieldErrors) => {
            fieldErrors.forEach((msg) => toast.error(msg));
          });
        }
      } else {
        toast.error("Update Failed");
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(variations);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {loading && <ModernLoadingScreen />}
      <DashboardHeader title="Update Product" />
      <Notifcation />

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search product to update"
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
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Basic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName" className="text-gray-700">
                      Product Name (English) *
                    </Label>
                    <Input
                      id="productName"
                      value={productData.productName}
                      onChange={handleChange}
                      placeholder="Product name in English"
                      className="mt-1 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="productNameAr"
                      className="text-gray-700 text-right block"
                    >
                      اسم المنتج (العربية) *
                    </Label>
                    <Input
                      id="productNameAr"
                      value={productData.productNameAr}
                      onChange={handleChange}
                      placeholder="اسم المنتج بالعربية"
                      className="mt-1 border-gray-300 text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="productDescription"
                      className="text-gray-700"
                    >
                      Product Description (English) *
                    </Label>
                    <Textarea
                      id="productDescription"
                      value={productData.productDescription}
                      onChange={handleChange}
                      placeholder="Describe your product here in English..."
                      className="mt-1 min-h-32 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="productDescriptionAr"
                      className="text-gray-700 text-right block"
                    >
                      وصف المنتج (العربية) *
                    </Label>
                    <Textarea
                      id="productDescriptionAr"
                      value={productData.productDescriptionAr}
                      onChange={handleChange}
                      placeholder="اكتب وصف المنتج بالعربية هنا..."
                      className="mt-1 min-h-32 border-gray-300 text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="productPrice" className="text-gray-700">
                    Product Price *
                  </Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={productData.productPrice}
                    onChange={handleChange}
                    placeholder="Price in $"
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
                      <span className="text-sm text-gray-500">$</span>
                      <Input
                        id="discountedPrice"
                        type="text"
                        value={productData.discountedPrice}
                        onChange={handleChange}
                        placeholder="Discounted price"
                        className="flex-1 border-gray-300"
                        min="0"
                      />
                      {/* <span className="text-sm text-gray-500">Sales</span>
                      <Input
                        id="salesPrice"
                        type="text"
                        value={productData.salesPrice}
                        onChange={handleChange}
                        placeholder="Sales price"
                        className="flex-1 border-gray-300"
                        min="0"
                      /> */}
                    </div>
                  </div>

                  {/* <div>
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
                        <Label htmlFor="tax-yes" className="text-gray-700">
                          Yes
                        </Label>
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
                        <Label htmlFor="tax-no" className="text-gray-700">
                          No
                        </Label>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* <div>
                  <Label className="text-gray-700">Expiration *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="relative">
                      <Input
                        id="expirationStart"
                        type="date"
                        value={productData.expirationStart}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="relative">
                      <Input
                        id="expirationEnd"
                        type="date"
                        value={productData.expirationEnd}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div> */}

                {/* Variation weight and pricing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-10 gap-4 items-end">
                    <div className="col-span-4">
                      <Label className="text-gray-700">
                        Variation weight *
                      </Label>
                    </div>
                    <div className="col-span-4">
                      <Label className="text-gray-700">
                        Variation Pricing *
                      </Label>
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
                          placeholder="e.g.,350$"
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
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Add attachment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Label
                  htmlFor="attachment-file"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="mb-3">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>

                  {attachment ? (
                    <span className="text-gray-500 mb-3">
                      {attachment.isExisting
                        ? "Existing attachment"
                        : attachment.file?.name || "New attachment"}
                    </span>
                  ) : (
                    <span className="text-gray-500 mb-3">
                      File: PDF, DOCX etc. (Optional)
                    </span>
                  )}

                  <input
                    id="attachment-file"
                    type="file"
                    className="hidden"
                    onChange={handleAttachmentUpload}
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
                    {attachment ? "Change File" : "Choose file"}
                  </Button>

                  {attachment && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="mt-2"
                      onClick={() => setAttachment(null)}
                    >
                      Remove Attachment
                    </Button>
                  )}
                </Label>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stockQuantity" className="text-gray-700">
                      Stock Quantity{" "}
                      {productData.stockStatus !== "out_of_stock" && "*"}
                    </Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={productData.stockQuantity}
                      onChange={handleChange}
                      placeholder="100"
                      className="mt-1 border-gray-300"
                      disabled={productData.stockStatus === "out_of_stock"}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockStatus" className="text-gray-700">
                      Stock Status *
                    </Label>
                    <Select
                      value={productData.stockStatus}
                      onValueChange={(value) =>
                        handleSelectChange("stockStatus", value)
                      }
                    >
                      <SelectTrigger
                        className="mt-1 border-gray-300"
                        id="stockStatus"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_stock">In Stock</SelectItem>
                        <SelectItem value="out_of_stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2">
                  <Switch
                    id="unlimitedStock"
                    checked={productData.unlimitedStock}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("unlimitedStock", checked)
                    }
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <Label htmlFor="unlimitedStock" className="text-gray-700">
                    Unlimited Stock
                  </Label>
                </div> */}

                {/* <div className="space-y-2">
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
                </div> */}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={(e) => handleSubmit(e, true)}
                variant="outline"
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600 border-none"
              >
                Save as Draft
              </Button>
              <Button
                onClick={(e) => handleSubmit(e, false)}
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 border-none"
              >
                Update Product
              </Button>
            </div>
          </div>

          {/* Right Column - Product Images and Categories */}
          <div className="space-y-6">
            {/* Upload Product Images */}
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Product Images *
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Add multiple images (Required)
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Main Image Preview */}
                <div className="relative w-full h-64 rounded-lg border border-dashed border-gray-300 overflow-hidden bg-gray-100">
                  {productImages.length > 0 ? (
                    <>
                      {productImages[currentImageIndex].isExisting ? (
                        <img
                          src={productImages[currentImageIndex].url.path}
                          alt={`Product Preview ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(
                            productImages[currentImageIndex].files,
                          )}
                          alt={`Product Preview ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain"
                        />
                      )}
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
                      {img.isExisting ? (
                        <img
                          src={img.url.path}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(img.file)}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
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
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="productCategory" className="text-gray-700">
                    Product Categories *
                  </Label>
                  <select
                    className="border border-gray-200 rounded shadow-sm px-3 py-2"
                    value={String(productData?.productCategory)}
                    onChange={(e) =>
                      handleSelectChange("productCategory", e.target.value)
                    }
                  >
                    {categories?.map((category) => (
                      <React.Fragment key={category.id}>
                        <option value={category.id} className="font-bold">
                          {category.name}
                        </option>
                        {category.children &&
                          category.children.map((child) => (
                            <option key={child.id} value={child.id}>
                              &nbsp;&nbsp;&nbsp;{child.name}
                            </option>
                          ))}
                      </React.Fragment>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="productTag" className="text-gray-700">
                    Product Tag *
                  </Label>
                  <Select
                    value={productData.productTag}
                    onValueChange={(value) =>
                      handleSelectChange("productTag", value)
                    }
                  >
                    <SelectTrigger
                      className="mt-1 border-gray-300"
                      id="productTag"
                    >
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
