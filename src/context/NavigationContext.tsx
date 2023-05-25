import { createContext, useState, ReactElement, Dispatch, SetStateAction, useMemo } from 'react';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

interface ContextVal {
	openState: UseState<boolean | null>;
}

interface Props {
	children: ReactElement;
}

export const NavigationContext = createContext<ContextVal>(undefined!);

export const NavigationProvider = ({ children }: Props) => {
	const openState = useState<boolean | null>(false);
	const value = useMemo(
		() => ({
			openState,
		}),
		[openState]
	);
	return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};
