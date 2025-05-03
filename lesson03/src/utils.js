const handleEvent = (event, cb, props) => {
    event.stopPropagation();
    cb(...props);
  };
  
export { handleEvent };