import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";

const BuyNowModal = ({ addressInfo, setAddressInfo, onSubmit, triggerComponent }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleChange = e => setAddressInfo(s => ({ ...s, [e.target.name]: e.target.value }));

    const showModal = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                setVisible(false);
                form.resetFields();
                onSubmit(values);
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    return (
        <>
            <span onClick={showModal} className="w-full">{triggerComponent}</span>

            <Modal
                title={<span className="text-white text-lg font-semibold">Complete Your Purchase</span>}
                open={visible}
                onCancel={handleCancel}
                footer={null}
                className="custom-dark-modal"
                closeIcon={<span className="text-[#BB86FC] hover:text-white transition-colors">✕</span>}
            >
                <Form form={form} layout="vertical" className="space-y-5">
                    <Form.Item
                        name="name"
                        label={<span className="text-[#FFFFFF] font-medium">Full Name</span>}
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            value={addressInfo.name}
                            onChange={handleChange}
                            className="input-dark"
                        />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label={<span className="text-[#FFFFFF] font-medium">Address</span>}
                        rules={[{ required: true, message: "Please input your address!" }]}
                    >
                        <Input.TextArea
                            name="address"
                            placeholder="Enter your address"
                            value={addressInfo.address}
                            onChange={handleChange}
                            className="input-dark"
                            rows={3}
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-5">
                        <Form.Item
                            name="zipCode"
                            label={<span className="text-[#FFFFFF] font-medium">Zip Code</span>}
                            rules={[
                                { required: true, message: "Please input your zipcode!" },
                                { pattern: /^\d+$/, message: "Zipcode must be numeric" }
                            ]}
                        >
                            <Input
                                name="zipCode"
                                placeholder="Enter zipcode"
                                value={addressInfo.zipCode}
                                onChange={handleChange}
                                className="input-dark"
                            />
                        </Form.Item>

                        <Form.Item
                            name="mobileNumber"
                            label={<span className="text-[#FFFFFF] font-medium">Mobile Number</span>}
                            rules={[
                                { required: true, message: "Please input your mobile number!" },
                                { pattern: /^\d+$/, message: "Mobile number must be numeric" }
                            ]}
                        >
                            <Input
                                name="mobileNumber"
                                placeholder="Enter mobile number"
                                value={addressInfo.mobileNumber}
                                onChange={handleChange}
                                className="input-dark"
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 rounded-lg border border-[#BB86FC] text-[#BB86FC] hover:bg-[#BB86FC]/10 transition-all duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-[#BB86FC] text-[#121212] px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:brightness-110 hover:scale-105"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </Form>
            </Modal>

            {/* Tailwind styles override for Ant Modal */}
            <style jsx="true">{`
                .custom-dark-modal .ant-modal-content {
                    background-color: #1E1E1E !important;
                }
                .custom-dark-modal .ant-modal-header {
                    background-color: #1E1E1E !important;
                    border-bottom: 1px solid #2D2D2D !important;
                }
                .custom-dark-modal .ant-modal-footer {
                    background-color: #1E1E1E !important;
                    border-top: 1px solid #2D2D2D !important;
                }
                .input-dark {
                    background-color: #121212 !important;
                    color: white !important;
                    border: 1px solid #333 !important;
                }
                .input-dark::placeholder {
                    color: #888 !important;
                }
                .input-dark:focus {
                    border-color: #BB86FC !important;
                    box-shadow: 0 0 0 2px rgba(187,134,252,0.3) !important;
                }
            `}</style>
        </>
    );
};

export default BuyNowModal;
