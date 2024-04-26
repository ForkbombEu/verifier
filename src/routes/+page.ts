//
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	redirect(301, '/home');
};
