import { persistedState } from './persistedState.svelte';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

const createStore = <T>(key: string, initialValue: T, storageType: object) => {
	let storedValue;

	if (browser) {
		storedValue = persistedState(key, initialValue, storageType);
	}

	const value = writable(storedValue ? storedValue.value : initialValue);

	return value;
};

export const client = createStore('client', {}, { storage: 'session' });
export const messages = createStore('messages', {}, { storage: 'session' });
export const activeAreas = createStore(
	'activeAreas',
	[
		{
			id: 'e536c320-1e5e-4be1-96c4-620e34b0bce0',
			status: false
		},
		{
			id: 'bf5fc8a5-d933-40cb-94cb-36d6e157b0d1',
			status: false
		},
		{
			id: '77d2f51d-8981-4261-b90f-e5901fef066b',
			status: false
		},
		{
			id: '4939f4c0-fc8d-4a56-ab99-b67f921568aa',
			status: false
		},
		{
			id: '1cb15f70-c553-460e-833c-b4753f66bd25',
			status: false
		},
		{
			id: 'b2e20191-9d7a-484e-9c49-13f1329b4b3e',
			status: false
		},
		{
			id: '89de7e09-a1fe-4a93-9421-dda0c70aa956',
			status: false
		}
	],
	{ storage: 'session' }
);
export const helpMessages: Writable<boolean> = createStore('helpMessages', false, { storage: 'session' });
export const updateHelpMessages: Writable<boolean> = createStore('updateHelpMessages', false, { storage: 'session' });
export const isLanding: Writable<boolean> = createStore('isLanding', false, { storage: 'session' });
export const isPaused: Writable<boolean> = createStore('isPaused', false, { storage: 'session' });
export const isHalfway: Writable<boolean> = createStore('isHalfway', false, { storage: 'session' });
export const isCompleted: Writable<boolean> = createStore('isCompleted', false, { storage: 'session' });
export const pain: Writable<number> = createStore('pain', 0, { storage: 'session' });
export const difficult: Writable<number> = createStore('difficult', 0, { storage: 'session' });
export const user: Writable<User> = createStore('user', { id: '', email: '', createdAt: '', updatedAt: '' }, { storage: 'local' });
export const usersettings: Writable<object> = createStore('usersettings', {}, { storage: 'local' });
export const allUsers: Writable<[]> = createStore('allUsers', [], { storage: 'local' });
export const groups: Writable<Group[]> = createStore('groups', [], { storage: 'local' });
export const exercises: Writable<Exercise[]> = createStore('exercises', [], { storage: 'local' });
export const error: Writable<{ status: boolean; message: string }> = createStore('error', { status: false, message: '' }, { storage: 'session' });
export const userExercises: Writable<Exercise[]> = createStore('userExercises', [], { storage: 'local' });
export const currentMode: Writable<string> = createStore('currentMode', 'display', { storage: 'session' });
export const currentGroup: Writable<Group> = createStore('currentGroup', { id: '', title: '', users: [], groups: [], createdAt: '', updatedAt: '' }, { storage: 'session' });
export const currentExercise: Writable<Exercise> = createStore('currentExercise', { id: '', title: '', time: 0, createdAt: '', updatedAt: '' }, { storage: 'session' });
export const version: Writable<string> = createStore('version', '1.0.0', { storage: 'session' });
