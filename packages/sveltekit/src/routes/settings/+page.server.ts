import type { Actions } from './$types';
import { Api } from 'sst/node/api';

export const actions = {
  async removeData({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    
    try {
      // Send a POST request to the delete user endpoint
      const userDeleteURL = `${Api.regainApi.url}/user/update/${email}`;
      const deleteResponse = await fetch(
        userDeleteURL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!deleteResponse.ok) {
        return {
          success: false,
          error: 'Failed to send magic link, this error has been logged with FASTlab.'
        }
      } else {
        return {
          success: true,
          error: ''
        }
      }
    } catch (err) {
      return {
        success: false,
        error: err
      }
    }
  },
  async saveSettings({ request }: { request: Request }) {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
    
    try {
      // Send a POST request to the delete user endpoint
      const userDeleteURL = `${Api.regainApi.url}/userGroups/delete/${email}`;
      const deleteResponse = await fetch(
        userDeleteURL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!deleteResponse.ok) {
        return {
          success: false,
          error: 'Failed to send magic link, this error has been logged with FASTlab.'
        }
      } else {
          return {
            success: true,
            error: ''
          }
        }
    } catch (err) {
      return {
        success: false,
        error: err
      }
    }
	}
} satisfies Actions;
