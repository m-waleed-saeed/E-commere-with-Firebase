import React, { useState } from "react";
import { supabase } from "../../../config/supabase";
import { firestore } from "../../../config/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Form, Input, Button, Upload, Spin, Select } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth";

const { TextArea } = Input;

const categoryList = [
  { name: 'Mobile' },
  { name: 'Laptop' },
  { name: 'Watch' },
  { name: 'Tablet' },
  { name: 'Airpods' },
  { name: 'Gaming' },
  { name: 'Phone Case' },
  { name: 'Headphones' }
];

const AddProducts = () => {
  const { isAppLoading, setIsAppLoading } = useAuthContext();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      window.toastify("You can only upload image files!", "error");
    }
    return isImage;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleAdd = async (values) => {
    if (fileList.length === 0) {
      window.toastify("Please upload an image!", "error");
      return;
    }

    const imageFile = fileList[0].originFileObj;

    try {
      setIsProcessing(true);
      setIsAppLoading(true);

      const filePath = `public/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData?.publicUrl;

      const newDocRef = doc(collection(firestore, "products"));
      const productData = {
        id: newDocRef.id,
        name: values.name,
        price: Number(values.price),
        description: values.description,
        category: values.category,
        imageURL: imageUrl,
        createdAt: serverTimestamp(),
        time: serverTimestamp(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      };

      await setDoc(newDocRef, productData);

      window.toastify("Product added successfully!", "success");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/all-product-details");
    } catch (error) {
      console.error("Error:", error);
      window.toastify(error.message || "An error occurred", "error");
    } finally {
      setIsProcessing(false);
      setIsAppLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "32px",
      background: "#121212",
      borderRadius: "16px",
      border: "1px solid #2D2D2D",
      boxShadow: "0 0 15px rgba(187, 134, 252, 0.3)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      {/* Dark Theme Styles */}
      <style>
        {`
          .dark-form .ant-form-item-label > label {
            color: #BBBBBB !important;
          }
          
          .dark-input input, .dark-input .ant-select-selector, 
          .dark-input textarea, .dark-input .ant-upload {
            background-color: #1E1E1E !important;
            border-color: #2D2D2D !important;
            color: #FFFFFF !important;
          }
          
          .dark-input input::placeholder, 
          .dark-input textarea::placeholder {
            color: #777777 !important;
          }
          
          .dark-input input:hover, .dark-input textarea:hover,
          .dark-input .ant-select-selector:hover {
            border-color: #BB86FC !important;
          }
          
          .dark-input input:focus, .dark-input textarea:focus,
          .dark-input .ant-select-focused .ant-select-selector {
            border-color: #BB86FC !important;
            box-shadow: 0 0 0 2px rgba(187, 134, 252, 0.2) !important;
          }
          
          .dark-button {
            background: #BB86FC !important;
            color: #121212 !important;
            border-color: #BB86FC !important;
            font-weight: 500 !important;
            transition: all 0.2s !important;
          }
          
          .dark-button:hover {
            filter: brightness(110%) !important;
            transform: scale(1.05) !important;
          }
          
          .dark-button:active {
            transform: scale(0.95) !important;
          }
          
          .dark-upload .ant-upload-btn {
            background: #1E1E1E !important;
            border-color: #2D2D2D !important;
            color: #FFFFFF !important;
          }
          
          .dark-upload .ant-upload-btn:hover {
            border-color: #BB86FC !important;
            color: #BB86FC !important;
          }
          
          .ant-select-dropdown {
            background-color: #1E1E1E !important;
            border: 1px solid #2D2D2D !important;
          }
          
          .ant-select-item {
            color: #FFFFFF !important;
          }
          
          .ant-select-item:hover {
            background-color: #2D2D2D !important;
          }
          
          .ant-select-item-option-selected {
            background-color: #2D2D2D !important;
            color: #BB86FC !important;
          }
          
          .ant-upload-list-item-name {
            color: #FFFFFF !important;
          }
        `}
      </style>

      <h2 style={{
        textAlign: "center",
        marginBottom: "24px",
        color: "#BB86FC",
        fontWeight: "700",
        fontSize: "28px"
      }}>
         Add New Product
      </h2>

      <Spin spinning={isProcessing}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdd}
          autoComplete="off"
          className="dark-form"
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
          >
            <Input className="dark-input" placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the product price!" },
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: "Enter a valid price (e.g. 19.99)",
              },
            ]}
          >
            <Input className="dark-input" type="number" step="0.01" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select className="dark-input" placeholder="Select Product Category">
              {categoryList.map((item, index) => (
                <Select.Option key={index} value={item.name}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
              { min: 10, message: "Description must be at least 10 characters" },
            ]}
          >
            <TextArea className="dark-input" rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="image"
            rules={[
              {
                required: true,
                validator: () =>
                  fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject("Please upload an image!"),
              },
            ]}
          >
            <Upload
              className="dark-input dark-upload"
              listType="picture"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={isAppLoading}
              className="dark-button"
              style={{
                width: "100%",
                fontWeight: "bold"
              }}
            >
              {isProcessing ? "Adding Product..." : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AddProducts;