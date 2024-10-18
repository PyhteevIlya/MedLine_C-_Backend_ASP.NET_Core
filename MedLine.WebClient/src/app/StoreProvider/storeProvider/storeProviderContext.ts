import { createContext, useContext } from "react";
import StoreProvider from "./storeProvider";

export const StoreProviderContext = createContext<StoreProvider | null>(null);

// хук для вызова доставщика сторов
export const useStoreProvider = () => {
    const context = useContext(StoreProviderContext);

    if (context === null) {throw new Error('Приложение не обернуто в провайдер')}

    return context;
}