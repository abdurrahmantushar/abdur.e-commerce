import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';

export const GetUserDetails = async () => {
  try {
    const res = await Axios({
      ...SummaryApi.userDetails,
      headers: { "Cache-Control": "no-cache" } // prevent 304 caching
    });
    if(res.data?.success){

      return res.data.data || null;  // <-- return the user object directly
    }

  } catch (error) {
    console.error("GetUserDetails error:", error);
    return null;
  }
};
