'use client'
import Input from "@/components/Admin/Input";
import Form from "@/components/Form";

import IconeEndereco from "@/../public/icons/endereco.svg";
import IconeCep from "@/../public/icons/cep.svg";
import IconeRua from "@/../public/icons/rua.svg";
import IconeNumero from "@/../public/icons/numero.svg";
import IconeBairro from "@/../public/icons/predio.svg";
import IconeCidade from "@/../public/icons/cidade.svg";
import IconeEstado from "@/../public/icons/estado.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useUIStore } from "@/stores/uiStore";
import axios, { AxiosError } from "axios";

export default function Page(){
    const {
        darkMode, setDarkMode,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
    } = useUIStore();
    const { handleSubmit, control, register, reset, watch } = useForm();
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
    const [cepResult, setCepResult] = useState({
        street: '',
        district: '',
        city: '',
        state: '',
    });
    const cep = watch("zip_code") as string;
    useEffect(() => {
        const fetchCEP = async () => {
            if (!cep) return;
            const numericCep = cep.replace(/\D/g, '');
            if (cep && numericCep.length === 8) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/cep/${cep}`);
                    const { bairro, uf, localidade, logradouro } = response.data;

                    if (response.status === 200) {
                        setCepResult({ district: bairro, state: uf, city: localidade, street: logradouro });
                    }

                    if (cepResult.street ||cepResult.district ||cepResult.city ||cepResult.state) {
                        reset((prev) => ({
                            ...prev,
                            street: cepResult.street,
                            district: cepResult.district,
                            city: cepResult.city,
                            state: cepResult.state,
                        }));
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.error ?? 'Erro ao buscar CEP.';
                        setErrorMessage({
                            message,
                            visible: true,
                        });
                        return;
                    } 
                    console.error('Erro inesperado:', error);
                    setErrorMessage({
                        message: 'Erro inesperado ao buscar o CEP.',
                        visible: true,
                    });
                }
            }
        };

        fetchCEP();
    }, [cep]);

    function submitData(data: FieldValues) {
        localStorage.setItem("addressProperty", JSON.stringify(data));
    }

    useEffect(() => {
        const saved = localStorage.getItem("addressProperty");
        if (saved) {
          const parsed = JSON.parse(saved);
          reset(parsed);
        }
    }, [reset]);

    const watchedValues = watch();
      useEffect(() => {
        const requiredFields = [
          "zip_code",
          "number"
        ];
    
        const allFilled = requiredFields.every((field) => {
          const value = watchedValues[field];
          return (
            value !== undefined && value !== null && String(value).trim() !== ""
          );
        });
    
        setIsFormComplete(allFilled);
    }, [watchedValues]);
    return (
      <>
        <NavigationBar urlAble={isFormComplete}></NavigationBar>
        <Form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-row flex-wrap gap-8"
          title="Endereço"
          svg={<IconeEndereco />}>
            <Controller
                name="zip_code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="CEP"
                    id="zip_code"
                    required
                    placeHolder="00000-000"
                    type="text"
                    tabIndex={1}
                    svg={<IconeCep />}></Input>
                )}
            />

            <Controller
                name="street"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    label="Rua"
                    id="street"
                    placeHolder="Das Flores"
                    type="text"
                    svg={<IconeRua />}></Input>
                )}
            />

            <Controller
                name="number"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        value={field.value}
                        onChange={field.onChange}
                        label="Numero"
                        id="number"
                        placeHolder="numero"
                        type="number"
                        required
                        tabIndex={2}
                        svg={<IconeNumero />}>
                    </Input>
                )}
            />

            <Controller
                name="district"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    label="Bairro"
                    id="district"
                    placeHolder="Tupinambá"
                    type="text"
                    svg={<IconeBairro />}>
                </Input>
                )}
            />

            <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    label="Cidade"
                    id="city"
                    placeHolder="Garça"
                    type="text"
                    svg={<IconeCidade />}>
                </Input>
                )}
            />

            <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    label="Estado"
                    id="state"
                    placeHolder="SP"
                    type="text"
                    svg={<IconeEstado />}>
                </Input>
                )}
            />

            <Controller
                name="country"
                control={control}
                defaultValue="Brasil"
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    label="Pais"
                    id="country"
                    placeHolder="Brasil"
                    type="text"
                    svg={<IconeEstado />}>
                </Input>
                )}
            />
            <div className="block w-full">
                <button
                type="submit"
                className="flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">
                SALVAR
                </button>
            </div>
        </Form>
      </>
    );
}