// validations/auth.validation.js

export const validateRegister = (data) => {
    const { name, email, password, address } = data;

    // Name
    if (!name || name.trim() === "") {
        return "Name is required.";
    }

    if (name.length < 10 || name.length > 60) {
        return "Name must be between 10 and 60 characters.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Email is required.";
    }

    if (!emailRegex.test(email)) {
        return "Invalid email format.";
    }

    // Password
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    if (!password) {
        return "Password is required.";
    }

    if (!passwordRegex.test(password)) {
        return "Password must be 8-16 characters with at least one uppercase letter and one special character.";
    }

    // Address
    if (!address || address.trim() === "") {
        return "Address is required.";
    }

    if (address.length > 400) {
        return "Address cannot exceed 400 characters.";
    }

    return null;
};

export const validateLogin = (data) => {
    const { email, password } = data;

    if (!email) {
        return "Email is required.";
    }

    if (!password) {
        return "Password is required.";
    }

    return null;
};

export const validateChangePassword = (data) => {
    const { oldPassword, newPassword } = data;

    if (!oldPassword) {
        return "Old password is required.";
    }

    if (!newPassword) {
        return "New password is required.";
    }

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
        return "New password must be 8-16 characters with at least one uppercase letter and one special character.";
    }

    return null;
};