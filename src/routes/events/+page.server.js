import {getNewsData} from "$lib/server/mongoLoads.js";
export const load = async () => {
  try {

    const pubData = await getNewsData();
    return {
      ...pubData,
    };
  } catch (error) {
    console.error('Error loading profile data:', error);
    return { error: 'Failed to load data' };
  }
};