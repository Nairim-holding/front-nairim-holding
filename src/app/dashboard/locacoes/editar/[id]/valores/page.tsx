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
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import formatDateValueInput from "@/utils/formatDateValueInput";
import { Lease } from "@/types/lease";
import IconMoney from "@/components/Icons/IconMoney";

export default function Page() {
  const { handleSubmit, control, register, reset, watch } = useForm();
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const saved = localStorage.getItem(`valuesLeaseEdit-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset, id]);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const storedDataLocation = localStorage.getItem(`dataLocationEdit-${id}`);
      const stored = localStorage.getItem(`valuesLeaseEdit-${id}`);

      if (stored && storedDataLocation) {
        const parsed = JSON.parse(stored);
        reset(parsed);
        setHasLoaded(true);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/leases/${id}`
        );
        const leaseData = response.data as Lease;

        if (leaseData) {
          reset({
            rent_amount: leaseData.rent_amount,
            condo_fee: leaseData.condo_fee,
            property_tax: leaseData.property_tax,
            extra_charges: leaseData.extra_charges,
            agency_commission: leaseData.agency_commission,
            commission_amount: leaseData.commission_amount,
            rent_due_date: formatDateValueInput(leaseData.rent_due_date),
            tax_due_date: formatDateValueInput(leaseData.tax_due_date),
            condo_due_date: formatDateValueInput(leaseData.condo_due_date),
          });
        }

        if (!storedDataLocation) {
          const dataLocationLease = {
            contract_number: leaseData.contract_number,
            start_date: formatDateValueInput(leaseData.start_date),
            end_date: formatDateValueInput(leaseData.end_date),
            status: leaseData.status,
            property_id: leaseData.property?.id,
            type_id: leaseData.property?.type?.id,
            owner_id: leaseData.owner?.id,
            tenant_id: leaseData.tenant?.id,
          };
          localStorage.setItem(`dataLocationEdit-${id}`, JSON.stringify(dataLocationLease));
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
      const dataLocation = localStorage.getItem(`dataLocationEdit-${id}`);
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

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/leases/${id}`,
        payload
      );

      if (response.status === 200) {
        setSuccessMessage({
          visible: true,
          message: response.data.message || "Locação editada com sucesso!",
        });
        localStorage.clear();
        router.push("/dashboard/locacoes");
      }
    } catch (error) {
      console.error("Erro ao editar locação:", error);
      setErrorMessage({
        visible: true,
        message: "Erro ao editar a locação",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavigationBar
        allEnabled
        steps={[
          {
            path: `/dashboard/locacoes/editar/${id}/dados-locacoes`,
            label: "Dados Locação",
            key: "",
            icon: 0,
          },
          {
            path: `/dashboard/locacoes/editar/${id}/valores`,
            label: "Valores Locação",
            key: "",
            icon: 2,
          },
        ]}
        id={id}
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
              value={field.value}
              onChange={field.onChange}
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
              value={field.value ? field.value : 0}
              onChange={field.onChange}
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
              value={field.value ? field.value : 0}
              onChange={field.onChange}
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
              value={field.value ? field.value : 0}
              onChange={field.onChange}
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
              value={field.value ? field.value : 0}
              onChange={field.onChange}
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
              value={field.value ? field.value : 0}
              onChange={field.onChange}
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
              value={field.value}
              onChange={field.onChange}
              type="date"
              tabIndex={7}
              label="Vencimento Aluguel"
              id="rent_due_date"
              required
              placeHolder="Selecione a data"
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
              value={field.value}
              onChange={field.onChange}
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
              value={field.value}
              onChange={field.onChange}
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
            className={`max-w-[200px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-[#fff] rounded-lg text-[16px] font-normal border-[#8B5CF6] drop-shadow-purple-soft ${!isFormComplete ? "opacity-50 cursor-not-allowed" : ""}`}
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
