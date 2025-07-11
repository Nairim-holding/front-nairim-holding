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
import { Controller, useForm } from "react-hook-form";
import { useUIStore } from "@/stores/uiStore";
import axios from "axios";

export default function Page(){
    const {
        darkMode, setDarkMode,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
    } = useUIStore();
    const { handleSubmit, control, register, reset, watch } = useForm();
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
    const [item, setItem] = useState<boolean>(false);
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
            if (cep && cep.length === 9) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/cep/${cep}`);
                    const { bairro, uf, localidade, logradouro } = response.data;

                    if (response.status === 200) {
                        const { bairro, uf, localidade, logradouro } = response.data;

                        setCepResult({ district: bairro, state: uf, city: localidade, street: logradouro });

                        reset((prev) => ({
                            ...prev,
                            street: logradouro,
                            district: bairro,
                            city: localidade,
                            state: uf,
                        }));
                    }
                } catch (error) {
                    console.log(error)
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

    useEffect(() => {
        if (isFormComplete) {
            localStorage.setItem("addressProperty", JSON.stringify(watchedValues));
            setItem(true);
        }

        if(!isFormComplete){
            localStorage.removeItem("addressProperty");
            setItem(false);
        }
    }, [isFormComplete, watchedValues]);
    return (
      <>
        <NavigationBar formComplete={item} path="cadastrar"></NavigationBar>
        <Form
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
                    mask="cep"
                    label="CEP"
                    id="zip_code"
                    required
                    placeHolder="00000-000"
                    type="text"
                    tabIndex={1}
                    autoFocus
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
                    tabIndex={2}
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
                        tabIndex={3}
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
                    tabIndex={4}
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
                    tabIndex={5}
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
                    tabIndex={6}
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
                    tabIndex={7}
                    svg={<IconeEstado />}>
                </Input>
                )}
            />
        </Form>
      </>
    );
}