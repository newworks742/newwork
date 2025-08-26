import {getSingleNewsData} from "$lib/server/mongoLoads.js";

export const load = async ({ params }) => {
  try {
    const { eventid } = params;
    
    // Optional: Add validation for eventid
    if (!eventid) {
      return { error: 'Event ID is required' };
    }
    
    const pubData = await getSingleNewsData(eventid);
    return {
      newsdata: JSON.parse(JSON.stringify(pubData)),
    };
  } catch (error) {
    console.error('Error loading profile data:', error);
    return { error: 'Failed to load data' };
  }
};