import React from "react";

interface LabelProps{
    id: string;
    svg?: React.ReactNode;
    label: string;
    required?: boolean;
}

export default function Label({id, svg, label, required}: LabelProps){
    return(
        <label htmlFor={id} className="flex items-center gap-4 pl-2 mb-2 max-h-[20px]">
            {svg && svg}
            <p className="text-[#111111B2] text-[14px] font-normal">
                {label}
                {required && <span className="text-[#FF0000B2]">*</span>}
            </p>
        </label>
    )
}