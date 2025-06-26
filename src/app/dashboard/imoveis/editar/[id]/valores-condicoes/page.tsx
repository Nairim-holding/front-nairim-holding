'use client'
import Input from "@/components/Admin/Input";
import Select from "@/components/Admin/Select";
import TextArea from "@/components/Admin/TextArea";
import Form from "@/components/Form";

import IconeCifrao from "@/../public/icons/cifrao.svg";
import IconeValorImovel from "@/../public/icons/valor.svg";
import IconeDataCompra from "@/../public/icons/calendario.svg";
import IconeValorIptu from "@/../public/icons/iptu.svg";
import IconeAluguel from "@/../public/icons/chave.svg";
import IconeValorCondominio from "@/../public/icons/predio.svg";
import IconeStatusAtual from "@/../public/icons/aviso.svg";
import IconeObservacoes from "@/../public/icons/martelo.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
import axios from "axios";

export default function Page(){
    const options = [
        {label: 'Disponível', value: 'AVAILABLE'},
        {label: 'Ocupado', value: 'OCCUPIED'},
    ]

    const { control, register, reset, watch } = useForm();
    const [loadedFromStorage, setLoadedFromStorage] = useState(false);

    const [hasLoaded, setHasLoaded] = useState(false);

    const params = useParams();
    const id = params?.id;

  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem("valuesPropertyEdit");

      if (stored) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setHasLoaded(true);
        setLoadedFromStorage(true);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property/${id}`);
        const values = response.data?.values?.[0];

        if (values) {
          reset({
            purchase_value: values?.purchase_value || '',
            purchase_date: formatDate(values?.purchase_date) || '',
            property_tax: values?.property_tax || '',
            rental_value: values?.rental_value || '',
            condo_fee: values?.condo_fee || '',
            current_status: values?.current_status || '',
            sale_value: values?.sale_value || '',
            sale_date: formatDate(values?.sale_date) || '',
            extra_charges: values?.extra_charges || '',
            sale_rules: values?.sale_rules || '',
            lease_rules: values?.lease_rules || '',
            notes: values?.notes || '',
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }

      setHasLoaded(true);
    };

    loadData();
  }, [id, reset]);

    const watchedValues = watch();
      useEffect(() => {
        if (!hasLoaded) return;
        const requiredFields = [
          "purchase_value",
          "purchase_date",
          "property_tax",
          "rental_value",
          "condo_fee",
          "current_status",
          "sale_value",
          "sale_date",
          "extra_charges",
          "sale_rules",
          "lease_rules"
        ];
    
        const allFilled = requiredFields.every((field) => {
        const value = watchedValues[field];
        return value !== undefined && value !== null && String(value).trim() !== '';
        });

        if (allFilled) {
            localStorage.setItem('valuesPropertyEdit', JSON.stringify(watchedValues));
        } else if (!loadedFromStorage) {
            localStorage.removeItem('valuesPropertyEdit');
        }
    
    }, [watchedValues]);

    return (
      <>
        <NavigationBar allEnabled path="editar" id={id}></NavigationBar>
        <Form
          className="flex flex-row flex-wrap gap-8"
          title="Valores e Condições"
          svg={<IconeCifrao />}>
            <Controller
                name="purchase_value"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    tabIndex={1}
                    mask="money"
                    label="Valor do Imóvel (Compra)"
                    id="purchase_value"
                    required
                    placeHolder="R$ 180.000,00"
                    svg={<IconeValorImovel />}>
                </Input>
                )}
            />

            <Controller
                name="purchase_date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    type="date"
                    tabIndex={2}
                    label="Data Compra"
                    id="purchase_date"
                    required
                    placeHolder="12/05/2021"
                    svg={<IconeDataCompra />}>
                </Input>
                )}
            />

            <Controller
                name="property_tax"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Valor IPTU"
                    id="property_tax"
                    required
                    placeHolder="R$ 1.440,00"
                    type="text"
                    tabIndex={3}
                    mask="money"
                    svg={<IconeValorIptu />}>
                    </Input>
                )}
            />

            <Controller
                name="rental_value"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Valor Aluguel"
                    id="rental_value"
                    required
                    placeHolder="R$ 900,00"
                    type="text"
                    tabIndex={4}
                    mask="money"
                    svg={<IconeAluguel />}>
                </Input>
                )}
            />

            <Controller
                name="condo_fee"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    label="Valor Condomínio"
                    id="condo_fee"
                    required
                    placeHolder="R$ 320,00"
                    type="text"
                    tabIndex={5}
                    mask="money"
                    svg={<IconeValorCondominio />}>
                </Input>
                )}
            />

            <Controller
                name="current_status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <Select
                    onChange={field.onChange}
                    defaultValue={field.value}
                    label="Status Atual"
                    required
                    id="current_status"
                    options={options}
                    svg={<IconeStatusAtual />}>
                </Select>
                )}
            />

          <Controller
            name="sale_value"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Valor de Venda"
                id="sale_value"
                placeHolder="R$ 220.000,00"
                type="text"
                tabIndex={6}
                mask="money"
                required
                svg={<IconeValorImovel />}
              />
            )}
          />

          <Controller
            name="sale_date"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Data da Venda"
                id="sale_date"
                type="date"
                tabIndex={7}
                placeHolder="12/06/2024"
                required
                svg={<IconeDataCompra />}
              />
            )}
          />

          <Controller
            name="extra_charges"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Encargos / Custos Extras"
                id="extra_charges"
                type="text"
                tabIndex={8}
                mask="money"
                placeHolder="R$ 1.000,00"
                required
                svg={<IconeValorImovel />}
              />
            )}
          />

          <TextArea
            {...register("sale_rules")}
            placeHolder="Regras específicas para a venda"
            label="Regras de Venda"
            id="sale_rules"
            required
            svg={<IconeObservacoes />}
          />

          <TextArea
            {...register("lease_rules")}
            placeHolder="Escreva detalalhes não expecificados anteriormente"
            label="Regras de Locação"
            id="lease_rules"
            required
            svg={<IconeObservacoes></IconeObservacoes>}
          />

          <TextArea
            {...register("notes")}
            placeHolder="Anotações adicionais sobre o imóvel"
            label="Observações Gerais"
            id="notes"
            svg={<IconeObservacoes />}
          />
        </Form>
      </>
    );
}