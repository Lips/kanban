if (!crypto.randomUUID) {
    crypto.randomUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
}

const compiler = RapydScript.create_embedded_compiler();
window.onload = async () => {
  for (script of document.querySelectorAll("script[type='pyj']")) {
    let code
    if (src = script.src) {
      code = await fetch(src).then((x) => x.text())
    } else {
      code = script.textContent
    }
    try {
      eval(`(async () => {${compiler.compile(code)}})()`)
    } catch (err) {
      console.error(`${src}, ${err.line}, ${err.col}:\n${err.message}`)
      document.body.innerHTML = `<code style="text-color:red"><pre>${src}, ${err.line}, ${err.col}:\n${err.message}</pre></code>`
    }
  };
}
