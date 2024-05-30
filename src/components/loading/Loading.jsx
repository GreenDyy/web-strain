import React from "react";
import { HashLoader } from "react-spinners";

function Loading({size = 150}) {
    return (
        <HashLoader
            color="#00A551"
            loading={true}
            size={size}
            cssOverride={{ position: 'absolute', zIndex: 999}}
        />
    )
}

export default Loading