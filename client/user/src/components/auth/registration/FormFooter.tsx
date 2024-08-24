import React from 'react';
import Link from 'next/link';

interface FormFooterProps {
  onSubmit: () => void;
  isSignIn?: boolean; // Making isSignIn optional with default value as false
}

const FormFooter: React.FC<FormFooterProps> = ({ onSubmit, isSignIn = false }) => (
  <div className="m-auto mt-5">
    {isSignIn ? (
      <p className="mb-2 text-center text-sm text-gray-600 dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link
          className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
          href="/register"
        >
          Sign up here
        </Link>
      </p>
    ) : (
      <p className="mb-2 text-center text-sm text-gray-600 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
          href="/login"
        >
          Sign in here
        </Link>
      </p>
    )}
    <button
      type="button"
      onClick={onSubmit}
      className="bg-red-500 flex w-full gap-x-3 text-sm sm:text-base items-center justify-center text-white rounded-lg hover:bg-red-600 duration-300 transition-colors border border-transparent px-8 py-2.5"
    >
      <span>Next</span>
    </button>
    <div className="w-[80%] m-auto">
      <p className="text-center text-sm mt-5 mb-3 text-gray-400">
        By clicking on Next, you agree to the{" "}
        <a className="text-red-500 font-semibold" href="#">
          Terms of Services
        </a>{" "}
        and{" "}
        <a className="text-red-500 font-semibold" href="#">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  </div>
);

export default FormFooter;
