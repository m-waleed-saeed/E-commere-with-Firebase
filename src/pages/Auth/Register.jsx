import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Register = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Form values:', values);
      setIsProcessing(false);
      form.resetFields();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] flex items-center justify-center p-2 font-['Inter'] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#BB86FC] opacity-[0.03] rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#BB86FC] opacity-[0.03] rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-[#BB86FC]/5 to-transparent"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#BB86FC] rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float 6s ease-in-out ${i * 0.5}s infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full max-w-lg">
        {/* Main Card with Glass Morphism */}
        <div className="bg-[#1E1E1E]/90 backdrop-blur-xl border border-[#2D2D2D]/50 rounded-3xl p-8 shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(187,134,252,0.2)] hover:border-[#BB86FC]/30">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BB86FC] via-[#9C6DE4] to-[#7C4DFF] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#BB86FC]/30 transform hover:scale-105 transition-transform duration-300">
                <UserOutlined className="text-3xl text-[#121212] font-bold" />
              </div>
              <div className="absolute -inset-2 bg-[#BB86FC] rounded-2xl blur-md opacity-30 -z-10"></div>
            </div>
            <h2 className="text-[#FFFFFF] text-3xl font-bold mb-3 bg-gradient-to-r from-white to-[#BBBBBB] bg-clip-text ">
              Create Your Account
            </h2>
            <p className="text-[#BBBBBB] text-sm tracking-wide">Join our exclusive community and unlock premium features</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-6"
          >
            {/* Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                name="firstName"
                label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">FIRST NAME</span>}
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input
                  size="large"
                  placeholder="Enter first name"
                  prefix={<UserOutlined className="text-[#BB86FC] mr-2" />}
                  className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] !placeholder-[#fff] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">LAST NAME</span>}
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input
                  size="large"
                  placeholder="Enter last name"
                  prefix={<UserOutlined className="text-[#BB86FC] mr-2" />}
                  className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
                />
              </Form.Item>
            </div>

            {/* Email */}
            <Form.Item
              name="email"
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">EMAIL ADDRESS</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                size="large"
                placeholder="your.email@example.com"
                prefix={<MailOutlined className="text-[#BB86FC] mr-2" />}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">PASSWORD</span>}
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Create a strong password"
                prefix={<LockOutlined className="text-[#BB86FC] mr-2" />}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">CONFIRM PASSWORD</span>}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm your password"
                prefix={<LockOutlined className="text-[#BB86FC] mr-2" />}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mb-0 mt-8">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isProcessing}
                className="h-14 !bg-gradient-to-r !from-[#BB86FC] !to-[#9C6DE4] border-none !text-[#121212] font-bold text-base rounded-xl hover:from-[#C495FF] hover:to-[#A87AFF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#BB86FC]/25 hover:shadow-[#BB86FC]/40"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#121212] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Your Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
            </Form.Item>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-[#2D2D2D]/50">
              <p className="text-[#BBBBBB] text-sm">
                Already part of our community?{' '}
                <Link 
                  to='/auth/login' 
                  className="!text-[#BB86FC] font-semibold hover:text-[#D0B0FF] transition-all duration-300 underline-offset-4 hover:underline hover:scale-105 inline-block"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </Form>
        </div>

      </div>
    </div>
  );
};

export default Register;