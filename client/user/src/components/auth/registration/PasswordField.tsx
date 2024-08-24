import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordField = ({
    passwordVisibility,
    togglePasswordVisibility,
    value,
    name,
    onChange,
}: {
    passwordVisibility: boolean;
    togglePasswordVisibility: () => void;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <div className="mt-3 mb-3">
        <div className="flex items-center justify-between">
            <label className="block text-sm text-gray-500 dark:text-gray-300">Password</label>
        </div>
        <div className="relative flex items-center mt-2">
            <input
                type={passwordVisibility ? "text" : "password"}
                placeholder="Set your password"
                value={value}
                name={name}
                onChange={onChange}
                autoComplete="current-password"
                className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto mr-4"
            >
                {passwordVisibility ? <IoMdEye className="text-lg md:text-xl" /> : <IoMdEyeOff className="text-lg md:text-xl" />}
            </button>
        </div>
    </div>
);

export default PasswordField;