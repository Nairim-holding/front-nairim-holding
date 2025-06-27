'use client';
import React, { useEffect, useRef, useState } from 'react';
import Label from '../Label';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface InputFileProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: FileList | File[] | null;
  accept?: string;
  id: string;
  required?: boolean;
  svg?: React.ReactNode;
  textButton?: string;
  disabled?: boolean;
}

interface FilePreview {
  type: 'image' | 'pdf';
  name: string;
  url: string;
}

export default function InputFile({
  textButton = "Escolher arquivos",
  label,
  onChange,
  value,
  accept,
  id,
  required,
  svg,
  disabled
}: InputFileProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const openModal = (url: string) => setModalImage(url);
  const closeModal = () => setModalImage(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const generatePreviews = (files: File[]) => {
    const newPreviews: FilePreview[] = [];

    files.forEach((file) => {
      if (file?.type?.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [
            ...prev,
            { type: 'image', name: file.name, url: reader.result as string }
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file?.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        newPreviews.push({ type: 'pdf', name: file.name, url });
      }
    });

    if (newPreviews.length > 0) {
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  useEffect(() => {
    setPreviews([]);
    const arquivos =
      value instanceof FileList ? Array.from(value) :
      Array.isArray(value) ? value :
      [];

    if (arquivos.length > 0) {
      generatePreviews(arquivos);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && onChange) {
      const fileArray = Array.from(files);

      const currentFiles =
        value instanceof FileList ? Array.from(value) :
        Array.isArray(value) ? value :
        [];

      const updatedFiles = [...currentFiles, ...fileArray];

      const dataTransfer = new DataTransfer();
      updatedFiles.forEach(file => dataTransfer.items.add(file));

      const fakeEvent = {
        target: {
          value: Array.from(dataTransfer.files),
          files: dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(fakeEvent);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setPreviews((prev) => {
      const file = prev[indexToRemove];
      if (file.type === 'pdf') {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter((_, i) => i !== indexToRemove);
    });

    const arquivos =
      value instanceof FileList ? Array.from(value) :
      Array.isArray(value) ? value :
      [];

    const updatedFiles = arquivos.filter((_, i) => i !== indexToRemove);
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));

    const fakeEvent = {
      target: {
        value: Array.from(dataTransfer.files),
        files: dataTransfer.files
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    if (onChange) onChange(fakeEvent);
  };

  return (
    <div className="w-full">
      {modalImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000] cursor-pointer"
        >
          <img
            src={modalImage}
            alt="Imagem ampliada"
            className="max-w-full max-h-full rounded shadow-lg"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute top-[20px] right-[40px]" onClick={closeModal}><IoIosCloseCircleOutline color="#fff" size={40} /></button>
        </div>
      )}
      <Label id={id} label={label} required={required} svg={svg} />
      <div className={`${disabled && 'bg-[#EDEDED]'} flex flex-col items-start w-full p-5 border-2 border-dashed border-[#CCCCCC] rounded-lg`}>
        <button
          type="button"
          onClick={handleButtonClick}
          className="flex justify-center items-center max-w-[200px] px-5 w-full h-[45px] bg-[#F0F0F0] rounded-lg text-[16px] font-medium text-[#666666] border border-[#E0E0E0] drop-shadow-custom-black"
        >
          {textButton}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          multiple
          disabled={disabled}
        />

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4 w-full">
            {previews.map((file, index) => (
              <div
                key={index}
                className="relative group p-2 border rounded-md bg-white shadow-sm"
              >
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded"
                    onClick={() => openModal(file.url)}
                  />
                ) : (
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-red-600 font-medium truncate w-full">
                      {file.name}
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      Abrir PDF
                    </a>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:opacity-90"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
