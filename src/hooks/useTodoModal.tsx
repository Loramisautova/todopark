import { generatePath, useLocation, useNavigate } from 'react-router-dom';

type UseTodoModal = [
    (id: string) => void,
];

/**
 * Хук для унификации работы с модальным окном тудушки.
 *
 * @param {string} todoRoute Путь на котором должно открыться модальное окно
 *
 * @returns Возвращает:
 * - функция открытия модального
 */
export const useTodoModal = (todoRoute: string): UseTodoModal => {
    const navigate = useNavigate();
    const location = useLocation();

    const openFn = (id: string) => {
        const route = generatePath(todoRoute, { id });

        navigate(route, { state: { returnTo: location.pathname } });
    }

    return [openFn];
};
