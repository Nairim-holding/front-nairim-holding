"use client";
import Input from "@/components/Ui/Input";
import Form from "@/components/Ui/Form";

import IconeCifrao from "@/../public/icons/cifrao.svg";
import IconeDataCompra from "@/../public/icons/calendario.svg";
import IconeValorIptu from "@/../public/icons/iptu.svg";
import IconeAluguel from "@/../public/icons/chave.svg";
import IconeValorCondominio from "@/../public/icons/predio.svg";
import NavigationBar from "@/components/Admin/NavigationBar";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import IconMoney from "@/components/Icons/IconMoney";

export default function Page() {
  const { handleSubmit, control, reset, watch } = useForm();
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("valuesLocation");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const watchedValues = watch();

  useEffect(() => {
    const requiredFields = [
      "rent_amount",
      "rent_due_date",
    ];

    const allFilled = requiredFields.every((field) => {
      const value = watchedValues[field];
      return value !== undefined && value !== null && String(value).trim() !== "";
    });

    setIsFormComplete(allFilled);
  }, [watchedValues]);

  const {
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
  } = useUIStore();
  const router = useRouter();

  async function submitData(data: FieldValues) {
    setLoading(true);
    try {
      const dataLocation = localStorage.getItem("dataLocation");
      const parsedLocation = dataLocation ? JSON.parse(dataLocation) : {};

      const parseMoney = (value: string) =>
        value ? parseFloat(value.replace(/\D/g, "")) / 100 : 0;

      const payload = {
        property_id: parsedLocation.property_id,
        type_id: parsedLocation.type_id,
        owner_id: parsedLocation.owner_id,
        tenant_id: parsedLocation.tenant_id,
        contract_number: parsedLocation.contract_number,
        start_date: parsedLocation.start_date,
        end_date: parsedLocation.end_date,
        status: parsedLocation.status,

        rent_amount: parseMoney(data.rent_amount),
        condo_fee: parseMoney(data.condo_fee),
        property_tax: parseMoney(data.property_tax),
        extra_charges: parseMoney(data.extra_charges),
        agency_commission: data.agency_commission || null,
        commission_amount: parseMoney(data.commission_amount),
        rent_due_date: data.rent_due_date,
        tax_due_date: data.tax_due_date || null,
        condo_due_date: data.condo_due_date || null,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/leases`,
        payload
      );

      if (response.status === 200) {
        setSuccessMessage({
          visible: true,
          message: response.data.message || "Locação criada com sucesso!",
        });
        router.push("/dashboard/locacoes");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Erro ao criar locação:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao criar a locação",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavigationBar
        formComplete={isFormComplete}
        steps={[
          {
            path: `/dashboard/locacoes/cadastrar/dados-locacoes`,
            label: "Dados Locação",
            key: "dataLocation",
            icon: 0
          },
          {
            path: `/dashboard/locacoes/cadastrar/valores`,
            label: "Valores Locação",
            key: "valuesLocation",
            icon: 2
          },
        ]}
      />

      <Form
        className="flex flex-row flex-wrap gap-8"
        title="Valores da Locação"
        svg={<IconeCifrao />}
      >
        <Controller
          name="rent_amount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              mask="money"
              tabIndex={1}
              label="Valor Aluguel"
              id="rent_amount"
              required
              placeHolder="Digite o Valor do Aluguel"
              svg={<IconeAluguel className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="condo_fee"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              mask="money"
              tabIndex={2}
              label="Valor Condomínio"
              id="condo_fee"
              placeHolder="Valor do Condomínio"
              svg={<IconeValorCondominio className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="property_tax"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              mask="money"
              tabIndex={3}
              label="Valor IPTU"
              id="property_tax"
              placeHolder="Valor do IPTU"
              svg={<IconeValorIptu className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="extra_charges"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              mask="money"
              tabIndex={4}
              label="Taxas Extras"
              id="extra_charges"
              placeHolder="Valor das Taxas Extras"
              svg={<IconMoney margin color="#666" size={30} />}
            />
          )}
        />

        <Controller
          name="agency_commission"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              tabIndex={5}
              maxLength={3}
              label="Comissão Imobiliária (%)"
              id="agency_commission"
              placeHolder="Comissão %"
              svg={<IconMoney margin color="#666" size={30} />}
            />
          )}
        />

        <Controller
          name="commission_amount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              mask="money"
              tabIndex={6}
              label="Valor Comissão"
              id="commission_amount"
              placeHolder="Valor Comissão"
              svg={<IconMoney margin color="#666" size={30} />}
            />
          )}
        />

        <Controller
          name="rent_due_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              tabIndex={7}
              label="Vencimento Aluguel"
              id="rent_due_date"
              required
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="tax_due_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              tabIndex={8}
              label="Vencimento IPTU"
              id="tax_due_date"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
            />
          )}
        />

        <Controller
          name="condo_due_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              tabIndex={9}
              label="Vencimento Condomínio"
              id="condo_due_date"
              svg={<IconeDataCompra className="svg-darkmode-estatic" />}
            />
          )}
        />

        <div className="w-full flex justify-end mt-4">
          <button
            type="submit"
            onClick={handleSubmit(submitData)}
            className={`max-w-[200px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white rounded-lg text-[16px] font-normal drop-shadow-purple-soft ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete || loading}
            tabIndex={10}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </Form>
    </>
  );
}
