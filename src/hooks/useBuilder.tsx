import { useContext } from "react";
import { BuilderContext } from "../context/BuilderContext";

function useBuilder() {
    const context = useContext(BuilderContext)
    return context
}

export default useBuilder