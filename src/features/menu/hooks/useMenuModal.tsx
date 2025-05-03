import { useState } from "react";

export const useMenuModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return { isModalOpen, setIsModalOpen };   
}