export const sanitizeData = (data) => {
    const sanitizedData = { ...data };
  
    // Replace null values with empty strings
    Object.keys(sanitizedData).forEach((key) => {
      if (sanitizedData[key] === null) {
        sanitizedData[key] = "";
      }
    });
  
    return sanitizedData;
  };
  