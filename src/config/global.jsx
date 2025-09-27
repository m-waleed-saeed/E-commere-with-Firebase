import { message } from "antd";

window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

const emailRegex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/

window.IsEmail = email => emailRegex.test(email)

window.toastify = (text, type) => {
    switch (type) {
        case "success": message.success(text); break;
        case "error": message.error(text); break;
        case "warning": message.warning(text); break;
        case "info": message.info(text); break;
        default: message.info(text)
    }
}