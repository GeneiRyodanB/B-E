const API_BASE_URL = 'http://localhost:8080/api/v2/timeline';

export const timelineApi = {
  async getAllEvents() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getEventsByCountry(country: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/country/${encodeURIComponent(country)}`);
      if (!response.ok) throw new Error('Failed to fetch events by country');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events by country:', error);
      throw error;
    }
  },

  async getEventsByPeriod(period: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/period/${encodeURIComponent(period)}`);
      if (!response.ok) throw new Error('Failed to fetch events by period');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events by period:', error);
      throw error;
    }
  }
};