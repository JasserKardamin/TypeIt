reloadModule = (modulePath) => {
  import(modulePath)
    .then((module) => {
      console.log("Module reloaded:", module);
    })
    .catch((err) => console.error("Failed to reload module:", err));
};
