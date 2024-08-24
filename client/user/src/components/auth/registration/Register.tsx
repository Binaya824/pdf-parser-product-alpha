"use client"
import axios from 'axios';
import React, { useState } from 'react'
import 'react-phone-input-2/lib/style.css'
import FormHeader from './FormHeader';
import InputField from './InputField';
import PhoneNumberField from './PhoneNumberField';
import PasswordField from './PasswordField';
import FormFooter from './FormFooter';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import createAxiosInstance from '@/utils/createAxiosInstance';
import registerJoiSchema from "./joiSchema";
import { useRouter } from 'next/navigation';

const Register = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordVisibility: false,
    });


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const validateForm = () => {
        const { passwordVisibility, ...rest } = formState;
        const { error } = registerJoiSchema.validate(rest, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            errorMessages.forEach((message) => {
                toast.error(message, {
                    position: "top-right",
                });
            });
            return false;
        }
        return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (phone: string) => {
        setFormState((prev) => ({ ...prev, phone }));
    };

    const togglePasswordVisibility = () => {
        setFormState((prev) => ({ ...prev, passwordVisibility: !prev.passwordVisibility }));
    };


    const handleSubmit = async () => {
        //  check if user already clicked the next button :: To stop further clicks
        if (isLoading) {
            return;
        }
        if (!validateForm()) {
            return;
        }
        const toastId = toast.loading('Loading data', {
            position: "top-right"
        });
        setIsLoading(true);
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.post("/api/core/auth/register", {
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                password: formState.password
            });
            const {data, message, status} = response.data;
            const {token, user, Credit} = data;

            if (status === 201) {
                Cookies.set("authToken", token, {expires:20});
                toast.dismiss(toastId);
                toast.success('Registration success!', {
                    position: "top-right",
                });
                //after registration reset the state
                setFormState((prev) => {
                    return { ...prev, email: "", name: "", phone: "", password: "", passwordVisibility: false }
                })
                router.push("/app")
            }else{
                // wrong occurred
                throw new Error("Registration failed");
            }
        } catch (error) {
            // Handle error response
            // console.error("Registration error:", error);
            toast.error("Unexpected Error occurred.", {
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center' >
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* ---- first col starts--- */}
                    <div className='pt-10 hidden md:block' >
                        <div className="mt-4 md:mb-12 max-w-2xl">
                            <h1 className="mb-6 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-neutral-200">
                                Welcome to Seamless Data Extraction
                            </h1>
                            <p className="text-gray-600 dark:text-neutral-400">
                                Effortlessly upload your PDFs and let our advanced ML models handle the data extraction for you. Whether you&apos;re dealing with invoices, contracts, or reports, our platform streamlines the process, delivering fast and accurate results.
                            </p>

                        </div>
                    </div>
                    {/* ---- first col ends --- */}

                    {/* --- second col starts ---- */}
                    <div className='' >
                        <form>
                            <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                                {/* ---- Card ------ */}
                                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
                                    <FormHeader />
                                    <div className="mt-5">
                                        <InputField
                                            label="Name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formState.name}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        <InputField
                                            label="Email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formState.email}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        <PhoneNumberField phone={formState.phone} setPhone={handlePhoneChange} />
                                        <PasswordField
                                            name='password'
                                            passwordVisibility={formState.passwordVisibility}
                                            togglePasswordVisibility={togglePasswordVisibility}
                                            value={formState.password}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <FormFooter onSubmit={handleSubmit} isSignIn={false} />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* --- second col ends ---- */}
                </div>
            </div>
        </div>
    )
}

export default Register