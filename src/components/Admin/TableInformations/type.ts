import React from "react";

export interface TableInformationsProps {
  children: React.ReactNode;
  headers: {
    label: string;
    field: string;
    sortParam?: string;
  }[];
  emptyMessage?: string;
}