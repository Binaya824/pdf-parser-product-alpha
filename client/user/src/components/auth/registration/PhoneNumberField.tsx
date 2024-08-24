import PhoneInput from "react-phone-input-2";

const PhoneNumberField = ({
    phone,
    setPhone,
}: {
    phone: string;
    setPhone: (phone: string) => void;
}) => (
    <div className="mt-3 mb-3 text-base">
        <label className="mb-2 block text-sm text-gray-500 dark:text-gray-300">Phone number</label>
        <PhoneInput
            inputClass="!w-full !text-lg !h-12 !pl-[3.6rem] !py-2.5 !border !border-gray-200 !text-gray-700 !text-base focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            buttonClass="!p-1 !border !border-gray-200 !bg-transparent"
            country={"in"}
            value={phone}
            onChange={setPhone}
        />
    </div>
);

export default PhoneNumberField;