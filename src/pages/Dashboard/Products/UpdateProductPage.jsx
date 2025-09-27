import React, { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../../../contexts/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from "../../../config/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { supabase } from "../../../config/supabase";
import ScreenLoader from '../../../components/ScreenLoader';

const categoryList = [
  { name: 'fashion' },
  { name: 'shirt' },
  { name: 'jacket' },
  { name: 'mobile' },
  { name: 'laptop' },
  { name: 'shoes' },
  { name: 'home' },
  { name: 'books' }
];

const UpdateProductPage = () => {
  const { isAppLoading, setIsAppLoading, getAllProductFunction } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
    category: "",
    description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSingleProductFunction = useCallback(async () => {
    try {
      if (!id) {
        window.toastify("No product ID provided", "error");
        navigate("/dashboard/admin-dashboard");
        return;
      }

      setIsLoading(true);
      const productRef = doc(firestore, "products", id);
      const productDoc = await getDoc(productRef);
      
      if (!productDoc.exists()) {
        window.toastify("Product not found", "error");
        navigate("/dashboard/admin-dashboard");
        return;
      }
      
      const data = productDoc.data();
      setProduct({
        name: data.name || "",
        price: data.price?.toString() || "",
        imageURL: data.imageURL || "",
        category: data.category || "",
        description: data.description || ""
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      window.toastify("Failed to load product", "error");
      navigate("/dashboard/admin-dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      getSingleProductFunction();
    }
  }, [id, getSingleProductFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setProduct(prev => ({
        ...prev,
        imageURL: previewUrl
      }));
    } else {
      window.toastify("Please upload a valid image file", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      window.toastify("Product ID is missing", "error");
      return;
    }

    if (!product.name || !product.price || !product.category) {
      window.toastify("Please fill all required fields", "error");
      return;
    }

    const priceNumber = parseFloat(product.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      window.toastify("Please enter a valid price", "error");
      return;
    }

    setIsAppLoading(true);

    try {
      let imageUrl = product.imageURL;
      
      if (imageFile) {
        // Upload new image if provided
        const filePath = `products/${id}/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
      }

      const updatedProduct = {
        name: product.name,
        price: priceNumber,
        description: product.description,
        category: product.category,
        imageURL: imageUrl,
        updatedAt: new Date()
      };

      await updateDoc(doc(firestore, 'products', id), updatedProduct);
      window.toastify("Product updated successfully", "success");
      await getAllProductFunction();
      navigate('/dashboard/admin-dashboard');
    } catch (error) {
      console.error("Update error:", error);
      window.toastify(error.message || "Failed to update product", "error");
    } finally {
      setIsAppLoading(false);
    }
  };

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-[#1E1E1E] rounded-xl shadow-xl overflow-hidden border border-[#2D2D2D]">
        <div className="bg-[#1A1A1A] border-b border-[#2D2D2D] p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Update Product
          </h2>
          <p className="text-gray-400 mt-1">Edit product details below</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-200 text-white"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-200 text-white"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Category *</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-200 text-white appearance-none"
                  required
                >
                  <option value="" className="text-gray-500">Select a category</option>
                  {categoryList.map((cat) => (
                    <option key={cat.name} value={cat.name} className="bg-[#1E1E1E]">
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-200 text-white"
                  placeholder="Product description..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Product Image</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <label className="block w-full">
                      <span className="sr-only">Choose product image</span>
                      <div className="cursor-pointer bg-[#1E1E1E] border-2 border-dashed border-[#3A3A3A] rounded-lg p-4 text-center transition-all hover:border-[#BB86FC] hover:bg-[#2A2A2A]">
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#BB86FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="mt-2 text-sm font-medium text-gray-300">Upload Image</span>
                          <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</span>
                        </div>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  
                  {product.imageURL && (
                    <div className="group relative">
                      <p className="text-sm text-gray-500 mb-1">Preview:</p>
                      <img 
                        src={product.imageURL} 
                        alt="Product preview" 
                        className="w-20 h-20 object-cover rounded-md border-2 border-[#3A3A3A] group-hover:border-[#BB86FC] transition-all"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                        <button 
                          type="button"
                          className="text-white text-xs bg-[#BB86FC] bg-opacity-80 rounded-full p-1"
                          onClick={() => document.querySelector('input[type="file"]').click()}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t border-[#2D2D2D]">
            <button
              type="button"
              onClick={() => navigate('/dashboard/admin-dashboard')}
              className="px-6 py-3 bg-[#2D2D2D] text-gray-300 rounded-lg hover:bg-[#3D3D3D] transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAppLoading}
              className="px-8 py-3 bg-gradient-to-r from-[#BB86FC] to-[#7F5AF0] text-[#121212] font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.03] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAppLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#121212]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;