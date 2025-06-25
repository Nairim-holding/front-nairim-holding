export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")         
    .slice(0, 8)         
    .replace(/^(\d{5})(\d)/, "$1-$2"); 
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export const maskMoney = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return (Number(numeric) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const maskMeters = (value: string): string => {
  const onlyDigits = value.replace(/\D/g, "").slice(0, 5); 
  const numeric = (Number(onlyDigits) / 10).toFixed(1); 
  return `${numeric} m`;
};

export const maskSquareMeters = (value: string): string => {
  const onlyDigits = value.replace(/\D/g, "").slice(0, 6); 
  const numeric = (Number(onlyDigits) / 100).toFixed(2);  
  return `${numeric} m²`;
};

export const unmask = (value: string) => {
  return value.replace(/\D/g, "");
};
