import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { Badge } from "@nextui-org/react";
import { ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileUploadInitiated, setDocumentType, setFile, closeFileUpload, resetSelectedDoc, deleteSelectedFile } from '@/store/features/fileUpload/fileUploadSlice';
import FileUpload from "../fileUpload/FileUpload";
import MultiSelect from "../fileUpload/InputDocumentType";
import { GoArrowRight } from "react-icons/go";
import { LuMoveLeft } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import createAxiosInstance from "@/utils/createAxiosInstance";
import { Spinner } from "@nextui-org/react";
import { toast } from "sonner";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type DocCategory = string;

interface DocType {
  type: string;
  categories: DocCategory[];
}

const docType: DocType[] = [
  {
    type: "All",
    categories: []
  },
  {
    type: "Income",
    categories: ["Bank Statement", "Balance Sheet", "Profit & Loss"]
  },
  {
    type: "Procurement",
    categories: ["Purchase Order", "Invoice", "Receipt"]
  },
  {
    type: "Energy",
    categories: ["Electricity Bill", "Gas Bill", "Water Bill"]
  },
  {
    type: "Identification",
    categories: ["Passport", "Driver's License", "National ID", "Social Security Card"]
  },
  {
    type: "Insurance",
    categories: ["Health Insurance", "Vehicle Insurance", "Life Insurance", "Home Insurance"]
  },
  {
    type: "Tax Forms",
    categories: ["W-2", "1099", "Tax Return", "Form 16"]
  }
];

const DocumentModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(docType[0]);
  const [fileUploadError, setFileUploadError] = useState<{
    isError: boolean,
    message: string
  }>({
    isError: false,
    message: ""
  });
  const [isUploading, setUploading] = useState<boolean>(false);
  const { isFileUploadInitiated, documentType, file, documentCategory } = useAppSelector((state) => state.fileUpload);
  const dispatch = useAppDispatch();

  const handleSelectedDoc = (type: string, category: string) => {
    dispatch(setDocumentType({ type, category }))
  }

  const handleFileUpload = async () => {
    if (file === null) {
      setFileUploadError({
        isError: true,
        message: "Please select a file"
      });
    } else {
      // handle next steps
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", documentType as string);
        formData.append("category", documentCategory as string);

        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post("/api/core/files/upload", formData)
        // console.log("response", response)
        const { data } = response;
        const { status, } = data;

        // ---- Fake promise to test loading >>> Starts -----------
        // const nePromise = await new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     return resolve("Solved")
        //   }, 3000)
        // })
        // console.log("new Promise", nePromise)
        // ---- Fake promise to test loading >>> Ends -----------

        if (status === 200) {
          dispatch(closeFileUpload());
          toast.success("File uploaded", {
            position: "top-right"
          })
        } else {
          toast.error("File upload failed", {
            position: "top-right"
          })
        }

        // upload success
        // stop loading status
        // close the modal
        // redirect to all uploads page
        // toast upload is successful

      } catch (error) {
        console.log("Error", error);
        setFileUploadError({
          isError: true,
          message: "Upload failed!"
        })
      } finally {
        setUploading(false);
      }
    }
  }

  const handleRemoveSelectedFile = () => {
    dispatch(deleteSelectedFile())
  }

  useEffect(() => {
    let timeOutId: NodeJS.Timeout | any;

    if (fileUploadError.isError) {
      timeOutId = setTimeout(() => {
        setFileUploadError({ isError: false, message: "" });
      }, 3000);
    }

    return () => clearTimeout(timeOutId);
  }, [fileUploadError]);




  useEffect(() => {
    if (isFileUploadInitiated) {
      onOpen();
    }
  }, [isFileUploadInitiated, onOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          dispatch(closeFileUpload())
        }}
        size="5xl"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalBody>
                {
                  // checking the file category & document type
                  (documentCategory === null && documentType === null) ?
                    <div>
                      <header className="py-6 px-8 border-black border-b-2">
                        <h2 className="text-3xl mb-3">Select Document Type</h2>
                        <h4 className="text-lg font-light">
                          Choose from a list of ready-to-use document types
                        </h4>
                        <div className="mt-10">
                          <Input
                            className="outline-none"
                            type="text"
                            placeholder="EX: Invoice"
                            labelPlacement="outside"
                            endContent={<Search className="w-5" />}
                          />
                        </div>
                      </header>
                      <main className="w-full relative flex h-[62vh]">
                        <section className="border-black border-r-2 w-[30%] p-1">
                          <ul>
                            {docType.map((doc, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => setSelectedDoc(doc)}
                                  className={`cursor-pointer p-2 flex flex-col relative ${selectedDoc?.type === doc.type
                                    ? "bg-[#FFD0D0] text-red-600 rounded"
                                    : ""
                                    }`}
                                >
                                  {doc.type}
                                  <span className="self-end absolute top-[.7rem] w-[1.3rem] h-[1.3rem] bg-red-500 p-1 rounded-md text-white text-sm font-semibold flex items-center justify-center">
                                    {doc.categories.length}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </section>
                        <section className="p-4 flex-1 relative h-full  overflow-y-scroll w-[70%]">
                          {selectedDoc?.type !== "All" ? (
                            <div className="w-full">
                              <h3 className="text-xl font-semibold mb-4">
                                {selectedDoc?.type} Categories
                              </h3>
                              <ul className="flex gap-4 w-full overflow-x-hidden flex-wrap">
                                {selectedDoc?.categories.map((category, idx) => (
                                  <li onClick={() => handleSelectedDoc(selectedDoc.type, category)} key={idx} className="cursor-pointer mb-2 p-4 border border-gray-400 rounded-md flex gap-7">
                                    <Badge color="primary" variant="flat">
                                      {category}
                                    </Badge>
                                    <ChevronRight className="text-red-600" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div>
                              <ul>
                                {docType.map((doc, idx) =>
                                  <div key={idx} >
                                    <h3 className="text-xl font-semibold mb-4">
                                      {doc?.type} Categories
                                    </h3>
                                    <ul className="flex gap-4 w-full overflow-x-hidden flex-wrap">
                                      {doc?.categories.map((category, idx) => (
                                        <li onClick={() => handleSelectedDoc(doc.type, category)} key={idx} className="cursor-pointer mb-2 p-4 border border-gray-400 rounded-md flex gap-7">
                                          <Badge color="primary" variant="flat">
                                            {category}
                                          </Badge>
                                          <ChevronRight className="text-red-600" />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </ul>
                            </div>
                          )
                          }
                        </section>
                      </main>
                    </div>
                    :
                    <div className="min-h-72" >
                      {isUploading ?
                        <div className="h-96 flex justify-center items-center" >
                          <Spinner />
                        </div>
                        :
                        <div>
                          <h1 className='text-lg md:text-xl lg:text-2xl font-extrabold mb-3' >Create your document type</h1>
                          <MultiSelect />
                          {file === null ?
                            <FileUpload /> :
                            <div className="min-h-36 mt-5" >
                              <div className="w-full p-5 shadow-md rounded-md flex justify-between items-center" >
                                <h1>{file.name}</h1>
                                <button onClick={() => handleRemoveSelectedFile()} className="text-red-500 text-lg md:text-3xl" ><MdDelete /></button>
                              </div>
                            </div>
                          }

                          <p className="min-h-10 text-red-500 font-bold" > {fileUploadError.isError && fileUploadError.message} </p>
                          <div className='flex justify-end pr-5 space-x-4' >
                            <button onClick={() => dispatch(resetSelectedDoc())} className="flex items-center px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none text-xl ">
                              <LuMoveLeft className='' /> <span className='ml-3 mr-3' >Back</span>
                            </button>

                            <button onClick={() => handleFileUpload()} className="flex items-center px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none text-xl ">
                              <span className='mr-3' >Create</span> <GoArrowRight className='' />
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentModal;
