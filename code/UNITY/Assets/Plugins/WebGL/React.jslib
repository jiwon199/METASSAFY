mergeInto(LibraryManager.library, {
  openPhone: function (mode) {
    try {
      window.dispatchReactUnityEvent("openPhone",Pointer_stringify(mode));
    } catch (e) {
      console.warn("Failed to dispatch event");
    }
  },
});

