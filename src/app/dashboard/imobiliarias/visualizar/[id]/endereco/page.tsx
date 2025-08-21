"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";
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
import axios from "axios";
import { useParams } from "next/navigation";
import Agency from "@/types/agency";

export default function Page(){
    const { control, reset } = useForm();
    useEffect(() => {
    async function getPropertyById() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/agency/${id}`);
        const agencyData = response.data as Agency;
        const address = agencyData?.addresses?.[0]?.address;

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

    getPropertyById();
    }, [reset]);
    
    const params = useParams();
    const id = params?.id;
    return (
      <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/dados-imobiliaria`,
            label: "Dados da imobiliária",
            key: "dataAgency",
            icon: 0
          },
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/endereco`,
            label: "Endereço",
            key: "addressAgency",
            icon: 1
          },
          {
            path: `/dashboard/imobiliarias/visualizar/${id}/contato`,
            label: "Contato",
            key: "contactAgency",
            icon: 3
          },
        ]}></NavigationBar>
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
                    disabled
                    svg={<IconeCep className="svg-darkmode-estatic" />}></Input>
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
                    svg={<IconeRua className="svg-darkmode-estatic" />}></Input>
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
                        type="text"
                        required
                        tabIndex={2}
                        disabled
                        svg={<IconeNumero className="svg-darkmode-estatic" />}>
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
                    svg={<IconeBairro className="svg-darkmode-estatic" />}>
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
                    svg={<IconeCidade className="svg-darkmode-estatic" />}>
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
                    svg={<IconeEstado className="svg-darkmode-estatic" />}>
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
                    svg={<IconeEstado className="svg-darkmode-estatic" />}>
                </Input>
                )}
            />
        </Form>
      </>
    );
}