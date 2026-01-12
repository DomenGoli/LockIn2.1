function Day({ children }: {children: React.ReactNode}) {
    return (
        <div className="flex flex-col bg-(--day)">
            {children}
        </div>
    );
}

export default Day;


