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
import axios from "axios";
import Property from "@/types/property";
import formatDate from "@/utils/formatDate";

export default function Page(){
    const { control, reset, register } = useForm();

    const [data,setData] = useState<'AVAILABLE' | 'OCCUPIED'>();

    const params = useParams();
    const id = params?.id;
    
    useEffect(() => {
      async function getPropertyById() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property/${id}`);
        const propertyData = response.data;

        const values = propertyData?.values?.[0];

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
        setData(values?.current_status);
      }

      getPropertyById();
    }, []);

    return (
      <>
        <NavigationBar allEnabled path="visualizar" id={id}></NavigationBar>
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
                    autoFocus
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    mask="money"
                    label="Valor do Imóvel (Compra)"
                    id="purchase_value"
                    required
                    placeHolder="R$ 180.000,00"
                    disabled
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
                    label="Data Compra"
                    id="purchase_date"
                    required
                    disabled
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
                    disabled
                    placeHolder="R$ 1.440,00"
                    type="text"
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
                    mask="money"
                    disabled
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
                    mask="money"
                    disabled
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
                    options={[{value: data == 'OCCUPIED' ? 'Ocupado' : 'Disponível' , label: data == 'OCCUPIED' ? 'Ocupado' : 'Disponível' }]}
                    disabled
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
                mask="money"
                disabled
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
                placeHolder="12/06/2024"
                disabled
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
                mask="money"
                placeHolder="R$ 1.000,00"
                disabled
                svg={<IconeValorImovel />}
              />
            )}
          />

          <TextArea
            {...register("sale_rules")}
            disabled
            placeHolder="Regras específicas para a venda"
            label="Regras de Venda"
            id="sale_rules"
            svg={<IconeObservacoes />}
          />

          <TextArea
            {...register("lease_rules")}
            disabled
            placeHolder="Escreva detalalhes não expecificados anteriormente"
            label="Regras de Locação"
            id="lease_rules"
            svg={<IconeObservacoes></IconeObservacoes>}
          />

          <TextArea
            {...register("notes")}
            disabled
            placeHolder="Anotações adicionais sobre o imóvel"
            label="Observações Gerais"
            id="notes"
            svg={<IconeObservacoes />}
          />
        </Form>
      </>
    );
}