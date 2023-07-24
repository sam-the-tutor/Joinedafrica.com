import { useEffect, useState } from "react";

import { getErrorMessage } from "../../../../util/ErrorMessages";
import { getUserProfileFromSessionStorage } from "../util";

function useStateHandler() {
  const [profile, setProfile] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    principal: "",
    location: "",
  });
  const [componentMount, setComponentMount] = useState(false);

  useEffect(() => {
    async function init() {
      setComponentMount(true);
      const profile = await getUserProfileFromSessionStorage();
      if (profile?.err) {
        alert(getErrorMessage(profile.err));
      } else {
        setProfile(profile);
        setComponentMount(false);
      }
    }
    init();
  }, []);

  return { profile, setProfile, componentMount };
}

export default useStateHandler;
