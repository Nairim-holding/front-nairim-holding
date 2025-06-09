interface InputProps{
    id: string;
    label: string;
    required: boolean;
    type: string;
    value?: string;
    onChange?: () => void;
    placeHolder: string;
    svg?: any;
}

export default function Input({id, label, required, type, value, onChange, placeHolder, svg}: InputProps){
    return(
        <div className="flex flex-col font-poppins">
            <label htmlFor={id} className="flex items-center gap-4 pl-2 mb-1 max-h-[20px]">
                { svg && svg }
                <p className="text-[#111111B2] text-[14px] font-normal">{label}{required && <span className="text-[#FF0000B2]">*</span>}</p>
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                required={required}
                className="max-w-[300px] w-full border-2 border-[#CCCCCC] rounded-lg h-[40px] outline-none px-5 text-[#111111B2] text-[14px] font-normal placeholder-[#111111B2]"
            />
        </div> 
    )
}