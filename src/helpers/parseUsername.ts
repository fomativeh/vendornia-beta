export  const parseUsername = (username: string) => {
    let parsed = "";
    if (username?.length > 10) {
      let shortenedName = `${username.slice(0, 10)}...`;
      parsed = `${shortenedName[0].toUpperCase()}${shortenedName.substring(1)}`;
      return parsed;
    }
    if (username) {
      parsed = `${username[0].toUpperCase()}${username.substring(1)}`;
    }
    return parsed;
  };