function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function deleteWorker(workerId) {
    const url = `/ajax_delete/${workerId}`;
    fetch(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        }
    }).then((response) => {
        if (response.ok) return response.json()
    }).then(() => {
        const trToBeDeleted = document.getElementById(`worker-${workerId}`)
        trToBeDeleted.remove();
    })
}