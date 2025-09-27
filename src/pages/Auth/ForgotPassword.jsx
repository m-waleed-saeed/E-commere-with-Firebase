import React, { useState } from 'react';
import { Form, Typography, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { MailOutlined, ArrowLeftOutlined, SecurityScanOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleReset = async () => {
    if (!formData.email) {
      window.toastify('Please enter your email', 'error');
      return;
    }
    
    try {
      setIsProcessing(true);
      await sendPasswordResetEmail(auth, formData.email);
      window.toastify('Password reset email sent! Check your inbox', 'success');
      navigate('/auth/login');
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      
      window.toastify(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#BB86FC] opacity-[0.02] rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#BB86FC] opacity-[0.02] rounded-full blur-3xl animate-pulse-slow delay-1500"></div>
        <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-[#BB86FC] opacity-5 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-[#1E1E1E]/95 backdrop-blur-xl border border-[#2D2D2D]/60 rounded-3xl p-8 shadow-2xl shadow-black/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(187,134,252,0.1)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BB86FC] via-[#9C6DE4] to-[#7C4DFF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#BB86FC]/30 mx-auto">
                <SecurityScanOutlined className="text-3xl text-[#121212] font-bold" />
              </div>
              <div className="absolute -inset-2 bg-[#BB86FC] rounded-2xl blur-md opacity-20 -z-10"></div>
            </div>
            <Title level={2} className="!mb-3 !text-[#FFFFFF] !font-bold bg-gradient-to-r from-white to-[#BBBBBB] bg-clip-text ">
              Forgot Password
            </Title>
            <p className="text-[#BBBBBB] text-sm leading-relaxed">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <Form layout="vertical">
            <Form.Item
              label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">EMAIL ADDRESS</span>}
              required
            >
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="large"
                type="email"
                placeholder="your.email@example.com"
                prefix={<MailOutlined className="text-[#BB86FC] mr-2" />}
                className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#888888] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isProcessing}
                onClick={handleReset}
                className="h-12 !bg-gradient-to-r !from-[#BB86FC] !to-[#9C6DE4] border-none !text-[#121212] font-bold rounded-xl hover:from-[#C495FF] hover:to-[#A87AFF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#BB86FC]/20 mt-2"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-[#121212] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Email...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </Form.Item>

            {/* Security Info */}
            <div className="mt-6 p-4 bg-[#2A2A2A]/50 border border-[#BB86FC]/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-[#BB86FC] rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-[#121212] text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-[#BBBBBB] text-xs font-medium">Security Notice</p>
                  <p className="text-[#888888] text-xs mt-1">
                    The reset link will expire in 1 hour for your security. Check your spam folder if you don't see the email.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center pt-6 border-t border-[#2D2D2D]/50 mt-6">
              <p className="text-[#BBBBBB] text-sm">
                Remember your password?{' '}
                <Link 
                  to="/auth/login" 
                  className="!text-[#BB86FC] font-semibold hover:text-[#D0B0FF] transition-all duration-300 underline-offset-4 hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </Form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#BB86FC] to-transparent rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-tr from-[#BB86FC] to-transparent rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;