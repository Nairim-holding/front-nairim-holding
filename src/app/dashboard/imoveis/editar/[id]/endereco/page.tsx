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
import { useParams } from "next/navigation";
import Property from "@/types/property";

export default function Page(){
    const {
        darkMode, setDarkMode,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
    } = useUIStore();
    const { control, reset, watch } = useForm();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [loadedFromStorage, setLoadedFromStorage] = useState(false);
    const params = useParams();
    const id = params?.id;
    useEffect(() => {
        const loadData = async () => {
        const stored = localStorage.getItem("addressPropertyEdit");

        if (stored) {
            const parsed = JSON.parse(stored);
            reset(parsed);
            setLoadedFromStorage(true);
            setHasLoaded(true);
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property/${id}`);
            const propertyData = response.data as Property;
            const address = propertyData?.addresses?.[0]?.address;

            if (propertyData) {
            reset({
                zip_code: address?.zip_code || '',
                street: address?.street || '',
                number: address?.number || '',
                district: address?.district || '',
                city: address?.city || '',
                state: address?.state || '',
                country: address?.country || 'Brasil',
            });
            }
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }

        setHasLoaded(true);
        };

        loadData();
    }, [id, reset]);

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

    const watchedValues = watch();
      useEffect(() => {
        if (!hasLoaded) return;
        const requiredFields = [
          "zip_code",
          "number"
        ];
    
        const allFilled = requiredFields.every((field) => {
        const value = watchedValues[field];
        return value !== undefined && value !== null && String(value).trim() !== '';
        });

        if (allFilled) {
            localStorage.setItem('addressPropertyEdit', JSON.stringify(watchedValues));
        } else if (!loadedFromStorage) {
            localStorage.removeItem('addressPropertyEdit');
        }
    
    }, [watchedValues]);

    return (
      <>
        <NavigationBar allEnabled path="editar" id={id}></NavigationBar>
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