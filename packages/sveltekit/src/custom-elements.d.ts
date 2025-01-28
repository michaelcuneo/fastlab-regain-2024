import { HTMLAttributes } from 'svelte/elements';

declare module 'svelte/elements' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface SvelteHTMLElements<T> {
		'custom-div': HTMLAttributes<HTMLElement>;
	}

	export interface HTMLDivAttributes extends HTMLAttributes<HTMLDivElement> {
		onisVisible?: boolean;
	}
}

export {};
