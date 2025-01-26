import type { Actions, PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants.js';
import { createSessionForUser } from '$lib/utils/auth.js';
import { Api } from 'sst/node/api'

export const load: PageServerLoad = async ({ params }) => {
  // Extract authentication token from URL query parameters
  return {
    slug: params.slug
  }
}
