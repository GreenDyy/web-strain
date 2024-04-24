const TestButton = ({ onClick, variant, title }) => {
    // Sử dụng variant để xác định loại nút (primary, secondary, danger, v.v.)
    const variantClass = variant ? `btn btn-${variant}` : 'btn btn-primary';

    return (
        <button className={variantClass} onClick={onClick}>
            {title}
        </button>
    );
};

export default TestButton;