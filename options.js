document.addEventListener("DOMContentLoaded", () => {
  const domainList = document.getElementById("domainList");
  const saveButton = document.getElementById("save");

  chrome.storage.sync.get(["domains"], (data) => {
    domainList.value = (data.domains || []).join("\n");
  });

  saveButton.addEventListener("click", () => {
    const domains = domainList.value
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d);
    chrome.storage.sync.set({ domains }, () => {
      alert("保存しました！");
    });
  });
});
