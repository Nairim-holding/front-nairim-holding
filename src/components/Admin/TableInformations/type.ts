import React from "react";

export interface TableInformationsProps {
  children: React.ReactNode;
  headers: string[];
  emptyMessage?: string;
}