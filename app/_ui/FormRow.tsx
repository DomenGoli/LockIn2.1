function FormRow({label, children} :{ label: string, children:React.ReactNode }) {
    return (
        <div className="grid items-center grid-cols-[10rem_10rem] pt-[0.8rem] pb-[2rem] gap-[1.2rem] not-last:border-b-[1px] border-[var(--color-grey-100)]">
            <label htmlFor="">{label}</label>
            {children}
        </div>
    )
}

export default FormRow
