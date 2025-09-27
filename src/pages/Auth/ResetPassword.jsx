import React, { useState } from 'react';
import { Form, Typography, Input, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined, KeyOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ResetPassword = () => {
  const [formData, setFormData] = useState({ 
    newPassword: '',
    confirmPassword: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract oobCode from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get('oobCode');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = async () => {
    if (!oobCode) {
      window.toastify('Invalid reset link', 'error');
      navigate('/auth/forgot-password');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      window.toastify('Password must be at least 8 characters', 'error');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      window.toastify('Passwords do not match', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      await confirmPasswordReset(auth, oobCode, formData.newPassword);
      window.toastify('Password reset successful!', 'success');
      navigate('/auth/login');
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Password reset failed';
      if (error.code === 'auth/expired-action-code') {
        errorMessage = 'Reset link has expired';
      } else if (error.code === 'auth/invalid-action-code') {
        errorMessage = 'Invalid reset link';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }
      
      window.toastify(errorMessage, 'error');
      navigate('/auth/forgot-password');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
     
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-[#1E1E1E]/95 backdrop-blur-xl border border-[#2D2D2D]/60 rounded-3xl p-8 shadow-2xl shadow-black/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(187,134,252,0.1)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BB86FC] via-[#9C6DE4] to-[#7C4DFF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#BB86FC]/30 mx-auto">
                <KeyOutlined className="text-3xl text-[#121212] font-bold" />
              </div>
              <div className="absolute -inset-2 bg-[#BB86FC] rounded-2xl blur-md opacity-20 -z-10"></div>
            </div>
            <Title level={2} className="!mb-3 !text-[#FFFFFF] !font-bold bg-gradient-to-r from-white to-[#BBBBBB] bg-clip-text text-transparent">
              Create New Password
            </Title>
            <p className="text-[#BBBBBB] text-sm">
              Enter your new secure password below
            </p>
          </div>

          <Form layout="vertical" className="space-y-6">
            {/* New Password */}
            <Form.Item 
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">NEW PASSWORD</span>} 
              required
            >
              <Input.Password 
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                size="large" 
                placeholder="Enter your new password" 
                prefix={<LockOutlined className="text-[#BB86FC] mr-2" />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item 
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">CONFIRM PASSWORD</span>} 
              required
            >
              <Input.Password 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                size="large" 
                placeholder="Confirm your new password" 
                prefix={<LockOutlined className="text-[#BB86FC] mr-2" />}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            {/* Password Requirements */}
            <div className="p-4 bg-[#2A2A2A]/50 border border-[#2D2D2D] rounded-xl">
              <p className="text-[#BBBBBB] text-xs font-semibold mb-2">Password Requirements:</p>
              <ul className="text-[#888888] text-xs space-y-1">
                <li className={`flex items-center ${formData.newPassword.length >= 8 ? 'text-green-400' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.newPassword.length >= 8 ? 'bg-green-400' : 'bg-[#888888]'}`}></div>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#888888] mr-2"></div>
                  Include uppercase and lowercase letters
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#888888] mr-2"></div>
                  Include numbers and special characters
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block 
                loading={isProcessing} 
                onClick={handleReset} 
                disabled={!formData.newPassword || !formData.confirmPassword || formData.newPassword.length < 8}
                className="h-12 !bg-gradient-to-r !from-[#BB86FC] !to-[#9C6DE4] border-none text-[#121212] font-bold rounded-xl hover:from-[#C495FF] hover:to-[#A87AFF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#BB86FC]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-[#121212] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating Password...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </Form.Item>

            {/* Success Indicator */}
            {oobCode && (
              <div className="flex items-center justify-center space-x-2 text-green-400 text-xs bg-green-400/10 px-3 py-2 rounded-lg border border-green-400/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Reset link verified successfully</span>
              </div>
            )}
          </Form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#BB86FC] to-transparent rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-tr from-[#BB86FC] to-transparent rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>

      {/* Security Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-[#BBBBBB] text-xs bg-[#1E1E1E]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#2D2D2D]">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Secure Password Update</span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;