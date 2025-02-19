import { clsx, type ClassValue } from 'clsx';
import { ComponentType, createElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const withLayout = <T extends { children?: ReactNode }>(layout: ComponentType<T>, component: ComponentType) => {
	return () => {
		return createElement(layout, {
			children: createElement(component)
		} as T);
	};
};
