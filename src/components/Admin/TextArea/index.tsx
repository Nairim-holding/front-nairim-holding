interface TextAreaProps{
    id: string;
    label: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeHolder: string;
    svg?: React.ReactNode;
    tabIndex?: number;
    disabled?: boolean;
}

export default function TextArea({id, label, required, value, onChange, placeHolder, svg, tabIndex, disabled, ...props}: TextAreaProps){
    return(
        <div className="flex flex-col font-poppins w-full">
            <label htmlFor={id} className="flex items-center gap-4 pl-2 mb-1 max-h-[20px]">
                { svg && svg }
                <p className="text-[#111111B2] text-[14px] font-normal">{label}{required && <span className="text-[#FF0000B2]">*</span>}</p>
            </label>
            <textarea
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                required={required}
                className={`w-full border-2 border-[#CCCCCC] rounded-lg h-[100px] max-h-[100px] outline-none px-5 py-4 text-[#111111B2] text-[14px] font-normal placeholder-[#CCC] resize-none ${disabled && 'bg-[#EDEDED] cursor-not-allowed'}`}
                {...props}
                tabIndex={tabIndex}
            />
        </div> 
    )
}