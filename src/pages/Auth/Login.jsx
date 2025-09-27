import React, { useRef, useState } from 'react';
import { Form, Typography, Row, Col, Button, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone 
} from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const errorCountRef = useRef(0);
  const navigate = useNavigate();

  // onFinish ab form ke values ko handle karega
  const handleSubmit = ({ email, password }) => {
    setIsProcessing(true);

    // Debug check
    console.log("Login with:", email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.toastify('Login successful', 'success');
        errorCountRef.current = 0;
        navigate('/');
      })
      .catch((error) => {
        console.error("Firebase login error:", error);
        window.toastify('Invalid email or password', 'error');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#BB86FC] opacity-[0.02] rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#BB86FC] opacity-[0.02] rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-[#BB86FC] opacity-10 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-[#1E1E1E]/95 backdrop-blur-xl border border-[#2D2D2D]/60 rounded-3xl p-8 shadow-2xl shadow-black/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(187,134,252,0.15)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#BB86FC] via-[#9C6DE4] to-[#7C4DFF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#BB86FC]/30 mx-auto">
                <LockOutlined className="text-2xl text-[#121212] font-bold" />
              </div>
              <div className="absolute -inset-2 bg-[#BB86FC] rounded-2xl blur-md opacity-20 -z-10"></div>
            </div>
            <Title level={2} className="!mb-2 !text-[#FFFFFF] !font-bold bg-gradient-to-r from-white to-[#BBBBBB] bg-clip-text">
              Welcome Back
            </Title>
            <p className="text-[#BBBBBB] text-sm">Sign in to your account</p>
          </div>

          {/* Form */}
          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">EMAIL ADDRESS</span>}
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="your.email@example.com"
                    prefix={<MailOutlined className="text-[#BB86FC] mr-2" />}
                    className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#FFFFFF] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="password"
                  label={<span className="text-[#FFFFFF] font-semibold text-sm tracking-wide">PASSWORD</span>}
                  rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter your password"
                    prefix={<LockOutlined className="text-[#BB86FC] mr-2" />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className="h-12 !bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl !text-[#FFFFFF] placeholder-[#FFFFFF] hover:border-[#BB86FC] focus:border-[#BB86FC] focus:shadow-[0_0_0_3px_rgba(187,134,252,0.15)] transition-all duration-300 text-base"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isProcessing}
                  className="h-12 !bg-gradient-to-r !from-[#BB86FC] !to-[#9C6DE4] border-none !text-[#121212] font-bold rounded-xl hover:from-[#C495FF] hover:to-[#A87AFF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#BB86FC]/20 mt-4"
                >
                  Sign In
                </Button>

                {/* Footer Links */}
                <div className="mt-6 space-y-3">
                  <div className="text-center">
                    <p className="text-[#BBBBBB] text-sm">
                      Don't have an account?{' '}
                      <Link
                        to='/auth/register'
                        className="!text-[#BB86FC] font-semibold !hover:text-[#D0B0FF] !transition-all duration-300 underline-offset-4 hover:underline"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-[#BBBBBB] text-sm">
                      Forgot your password?{' '}
                      <Link
                        to='/auth/forgot-password'
                        className="!text-[#BB86FC] font-semibold !hover:text-[#D0B0FF] !transition-all duration-300 underline-offset-4 hover:underline"
                      >
                        Forgot Password
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
