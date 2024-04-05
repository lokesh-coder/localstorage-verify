console.log("foo");

window.addEventListener("load", (event) => {
  if (localStorage.getItem("loggedin") === "TRUE") {
    document.body.className = "logged";
  } else {
    document.body.className = "notlogged";
  }
});

const button = document.getElementById("btn");

button.addEventListener("click", () => {
  localStorage.setItem("loggedin", "TRUE");
  window.location.reload();
});

setInterval(() => {
  window.location.reload();
}, 5000);

(async () => {
  // document.body.classList.add("idb-fail");
  // if (!localStorage.getItem("loggedin")) return;

  const db = await idb.openDB("auth", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("user")) {
        console.log("created new user");
        db.createObjectStore("user", { keyPath: "id" });
      }
    },
  });
  const hasUser = await db.get("user", 1);
  const tx = await db.transaction("user", "readwrite");

  if (!hasUser && localStorage.getItem("loggedin")) {
    document.body.classList.add("idb-success");
    console.log("new user");
    await tx.store.add({
      id: 1,
      created_at: new Date(),
    });
    await tx.done;
  } else if (!localStorage.getItem("loggedin") && !hasUser) {
    document.body.classList.add("idb-fail");
  } else {
    document.body.classList.add("idb-success");
    console.log("user exists");
  }
})();
